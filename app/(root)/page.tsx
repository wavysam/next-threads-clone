import { getAllThreads } from "@/actions/thread";
import Thread from "@/components/posts/thread";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();
  const threads = await getAllThreads();

  if (!session?.user) {
    redirect("/login");
  }

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
