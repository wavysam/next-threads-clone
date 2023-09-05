"use client";

import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useCallback } from "react";

import ThreadImages from "@/components/posts/thread-images";
import { Post } from "@/types";
import ThreadAction from "./thread-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  data: Post;
  sessionId: string;
}
dayjs.extend(relativeTime);
export default function Thread({ data, sessionId }: Props) {
  const hasLiked = data.likes.includes(sessionId);
  const router = useRouter();

  const handleLike = useCallback(async () => {
    const res = await fetch("/api/thread/like", {
      method: "POST",
      body: JSON.stringify({ threadId: data.id }),
    });

    if (res.ok) {
      toast.success("Like successfully.");
      router.refresh();
    }
  }, [data.id, router]);

  const handleUnLike = useCallback(async () => {
    const res = await fetch("/api/thread/like", {
      method: "DELETE",
      body: JSON.stringify({ threadId: data.id }),
    });

    if (res.ok) {
      toast.success("Unlike successfully.");
      router.refresh();
    }
  }, [data.id, router]);

  const LikeIcon = hasLiked ? (
    <AiFillHeart size={25} color="red" onClick={handleUnLike} />
  ) : (
    <AiOutlineHeart size={25} onClick={handleLike} />
  );

  return (
    <article className="flex w-full flex-col py-5 border-b">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${data.user.id}`}>
              <Avatar>
                <AvatarImage src={data.user.profileImage as string} />
                <AvatarFallback />
              </Avatar>
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
                {LikeIcon}
              </div>

              <Link href={`/thread/${data.id}`}>
                <div className="cursor-pointer hover:bg-gray-100 p-1.5 rounded-full transition">
                  <AiOutlineMessage size={24} />
                </div>
              </Link>
            </div>
            <div className="flex space-x-3 text-gray-500 text-sm mt-1">
              <p className={`${data.likes.length === 0 && "hidden"}`}>
                {data.likes.length > 1
                  ? `${data.likes.length} likes`
                  : `${data.likes.length} like`}
              </p>
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
