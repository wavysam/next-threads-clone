import { prisma } from "@/lib/prismadb";
import { Post } from "@/types";

export const getThreadById = async (id: string): Promise<Post | null> => {
  const thread = prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      images: true,
      replies: true,
    },
  });

  return thread;
};
