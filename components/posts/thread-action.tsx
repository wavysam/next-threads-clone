"use client";

import { BiDotsHorizontalRounded, BiEdit, BiTrash } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DeleteDialog from "../modals/delete-modal";

interface Props {
  threadId: string;
}

export default function ThreadAction({ threadId }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/thread/${threadId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Thread deleted successfully.");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to delete thread.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <DeleteDialog
        open={open}
        onClose={() => setOpen(false)}
        disabled={loading}
        onSubmit={handleDelete}
      />
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
          <div
            className="flex items-center gap-2 hover:bg-gray-100 p-2 transition rounded-md cursor-pointer text-sm"
            onClick={() => setOpen(true)}
          >
            <BiTrash size={19} />
            Delete
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
