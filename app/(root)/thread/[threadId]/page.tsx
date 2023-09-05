import { getUserInfo } from "@/actions/user";
import { getThreadById } from "@/actions/thread";
import ReplyForm from "@/components/forms/reply-form";
import Replies from "@/components/reply/replies";
import Thread from "@/components/posts/thread";
import { Reply } from "@/types";

interface Props {
  params: {
    threadId: string;
  };
}

export default async function Page({ params }: Props) {
  const thread = await getThreadById(params.threadId);
  const currentUser = await getUserInfo();

  if (!thread) return null;

  return (
    <div>
      <Thread data={thread} sessionId={currentUser?.id as string} />
      <div className="my-10">
        <ReplyForm
          profileImage={currentUser?.profileImage as string}
          postId={thread.id}
          userId={currentUser?.id as string}
          username={thread.user.username}
        />
      </div>

      <hr className="mb-10" />
      {thread.replies.length === 0 && (
        <p className="text-center text-gray-500">No replies yet.</p>
      )}

      <div>
        {thread.replies.map((reply: Reply) => (
          <Replies
            key={reply.id}
            data={reply}
            currentUserId={currentUser?.id as string}
          />
        ))}
      </div>
    </div>
  );
}
