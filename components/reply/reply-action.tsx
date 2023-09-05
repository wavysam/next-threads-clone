"use client";

import { BiDotsHorizontalRounded, BiEdit, BiTrash } from "react-icons/bi";
import DeleteDialog from "../modals/delete-modal";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface ReplyActionProps {
  replyId: string;
}

const ReplyAction: React.FC<ReplyActionProps> = ({ replyId }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/reply/${replyId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Reply deleted.");
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to delete reply.");
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
          {/* <div className="flex items-center gap-2 hover:bg-gray-100 p-2 transition rounded-md cursor-pointer text-sm">
            <BiEdit size={19} />
            Edit
          </div> */}
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
};

export default ReplyAction;
