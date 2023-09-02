import { Heart, MessageCircle } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import ThreadImages from "@/components/thread-images";
import { Post, Reply } from "@/types";
import Link from "next/link";
import Image from "next/image";
import ThreadAction from "./thread-action";

interface Props {
  data: Post;
  sessionId: string;
}
dayjs.extend(relativeTime);
export default function Thread({ data, sessionId }: Props) {
  return (
    <article className="flex w-full flex-col py-5 border-b">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${data.user.id}`}
              className="relative h-11 w-11"
            >
              <Image
                src={data.user.profileImage as string}
                alt="Profile Image"
                fill
                className="rounded-full object-cover object-center"
              />
            </Link>
            {data.replies.length > 0 && (
              <div className="relative mt-0.5 w-[1px] grow rounded-full bg-gray-300" />
            )}
          </div>

          <div className="flex w-full flex-col">
            <div className="flex justify-between items-center">
              <Link href={`/profile/${data.user.id}`}>
                <h4 className="font-semibold">{data.user.username}</h4>
              </Link>
              <div className="flex gap-3 items-center">
                <p>{dayjs(data.createdAt).fromNow(true)}</p>
                {data.user.id === sessionId && (
                  <ThreadAction threadId={data.id} />
                )}
              </div>
            </div>
            <p className="my-2">{data.thread}</p>
            {data.images.length > 0 && <ThreadImages data={data.images} />}

            <div className="flex space-x-3 mt-3">
              <div className="cursor-pointer hover:bg-gray-100 p-1.5 rounded-full transition">
                <Heart />
              </div>

              <Link href={`/thread/${data.id}`}>
                <div className="cursor-pointer hover:bg-gray-100 p-1.5 rounded-full transition">
                  <MessageCircle />
                </div>
              </Link>
            </div>
            <div className="flex space-x-3 text-gray-500 text-sm mt-1">
              {/* <p>200 likes</p> */}
              <p className={`${data.replies.length === 0 && "hidden"}`}>
                {data.replies.length > 1
                  ? `${data.replies.length} replies`
                  : `${data.replies.length} reply`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
