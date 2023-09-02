import Thread from "@/components/thread";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

export default async function Home() {
  const session = await getAuthSession();
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

  return (
    <div>
      {threads.map((thread) => (
        <Thread
          key={thread.id}
          data={thread}
          sessionId={session?.user.id as string}
        />
      ))}
    </div>
  );
}
