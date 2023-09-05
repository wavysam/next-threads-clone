import dayjs from "dayjs";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";

import { Reply } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ReplyAction from "./reply-action";

interface RepliesProps {
  data: Reply;
  currentUserId: string;
}

dayjs.extend(relativeTime);

export default function Reply({ data, currentUserId }: RepliesProps) {
  return (
    <article className="flex w-full flex-col py-5 border-b">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${data.user.id}`}
              className="relative h-11 w-11"
            >
              <Avatar>
                <AvatarImage src={data.user.profileImage as string} />
                <AvatarFallback />
              </Avatar>
            </Link>
          </div>

          <div className="flex w-full flex-col">
            <div className="flex justify-between items-center">
              <Link href={`/profile/${data.user.id}`}>
                <h4 className="font-semibold">{data.user.username}</h4>
              </Link>
              <div className="flex gap-3 items-center">
                <p>{dayjs(data.createdAt).fromNow(true)}</p>
                {data.userId === currentUserId && (
                  <ReplyAction replyId={data.id} />
                )}
              </div>
            </div>
            <p className="my-2">{data.text}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
