import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

export const getUserInfo = async () => {
  const session = await getAuthSession();
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  return user;
};
