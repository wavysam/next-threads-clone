import { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

import { prisma } from "./prismadb";
import { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          type: "text",
          label: "Email",
          placeholder: "your email",
        },
        password: {
          type: "text",
          label: "Password",
          placeholder: "your password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        const matchPassword = await compare(
          credentials.password as string,
          user?.password as string
        );

        if (user && matchPassword) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string;
      }

      return session;
    },
    async jwt({ user, token }) {
      if (user) {
        const u = user as User;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
  },
};

export const getAuthSession = async () => await getServerSession(authOptions);
