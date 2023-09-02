"use client";

import { BiDotsHorizontalRounded, BiEdit, BiTrash } from "react-icons/bi";
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  threadId: string;
}

export default function ThreadAction({ threadId }: Props) {
  const router = useRouter();
  return (
    <Popover>
      <PopoverTrigger asChild className="relative">
        <div className="cursor-pointer">
          <BiDotsHorizontalRounded size={20} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-40 absolute right-0 p-1">
        <div
          className="flex items-center gap-2 hover:bg-gray-100 p-2 transition rounded-md cursor-pointer text-sm"
          onClick={() => router.push(`/thread/${threadId}/edit`)}
        >
          <BiEdit size={19} />
          Edit
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-100 p-2 transition rounded-md cursor-pointer text-sm">
          <BiTrash size={19} />
          Delete
        </div>
      </PopoverContent>
    </Popover>
  );
}
