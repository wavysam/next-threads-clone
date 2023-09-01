import { prisma } from "@/lib/prismadb";

export const getUserInfo = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
