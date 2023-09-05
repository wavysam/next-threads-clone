import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

import { prisma } from "@/lib/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, username, email, password } = body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
        username,
      },
    });

    if (existingUser) {
      return NextResponse.json("User already exist", { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        onboarded: false,
      },
    });

    return NextResponse.json(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
        onBoarded: user.onboarded,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
