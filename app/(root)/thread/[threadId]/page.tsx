import { getUserInfo } from "@/actions/get-user-info";
import { getThreadById } from "@/actions/thread";
import ReplyForm from "@/components/forms/reply-form";
import Thread from "@/components/thread";
import { getAuthSession } from "@/lib/auth";

interface Props {
  params: {
    threadId: string;
  };
}

export default async function Page({ params }: Props) {
  const thread = await getThreadById(params.threadId);
  const session = await getUserInfo();

  if (!thread) return null;

  return (
    <div>
      <Thread data={thread} sessionId={session?.id as string} />
      <div className="my-10">
        <ReplyForm
          profileImage={session?.profileImage as string}
          postId={thread.id}
          userId={session?.id as string}
          username={thread.user.username}
        />
      </div>
    </div>
  );
}
