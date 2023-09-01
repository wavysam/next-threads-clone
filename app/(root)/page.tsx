import Thread from "@/components/thread";
import { prisma } from "@/lib/prismadb";

export default async function Home() {
  const threads = await prisma.post.findMany({
    include: {
      user: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      {threads.map((thread) => (
        <Thread key={thread.id} data={thread} />
      ))}
    </div>
  );
}
