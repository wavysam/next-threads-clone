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
      replies: {
        include: {
          user: true,
          post: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return thread;
};

export const getAllThreads = async (): Promise<Post[]> => {
  const threads = await prisma.post.findMany({
    include: {
      user: true,
      images: true,
      replies: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return threads;
};
