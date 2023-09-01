import { Heart, MessageCircle } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThreadImages from "@/components/thread-images";
import { Post } from "@/types";

interface Props {
  data: Post;
}
dayjs.extend(relativeTime);
export default function Thread({ data }: Props) {
  return (
    <div className="border-b py-5">
      <div className="flex items-start">
        <Avatar>
          <AvatarImage
            src={data.user.profileImage as string}
            className="object-cover object-center"
          />
          <AvatarFallback />
        </Avatar>
        <div className="flex-1 ml-2">
          <div className="flex justify-between">
            <p className="font-semibold">{data.user.username}</p>
            <p className="text-gray-500">
              {dayjs(data.createdAt).fromNow(true)}
            </p>
          </div>
          <div className="mt-1">
            <p className="whitespace-pre-line mb-3">{data.thread}</p>
            {data.images.length > 0 && <ThreadImages data={data.images} />}
          </div>
          <div className="flex space-x-3 mt-3">
            <div className="cursor-pointer hover:bg-gray-100 p-1.5 rounded-full transition">
              <Heart />
            </div>
            <div className="cursor-pointer hover:bg-gray-100 p-1.5 rounded-full transition">
              <MessageCircle />
            </div>
          </div>
          <div className="flex space-x-3 text-gray-500 text-sm mt-1">
            <p>200 likes</p>
            <p>200 replies</p>
          </div>
        </div>
      </div>
    </div>
  );
}
