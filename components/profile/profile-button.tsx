"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { User } from "@/types";

interface Props {
  sessionId: string;
  userId: string;
  data: User;
}

export default function ProfileButton({ sessionId, userId, data }: Props) {
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const follow = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/follow/${userId}`, {
        method: "PATCH",
      });

      if (res.ok) {
        router.refresh();
        toast.success("Follow successfully.");
      }
    } catch (error) {
      toast.error("Failed to follow user");
    } finally {
      setLoading(false);
    }
  }, [router, userId]);

  const unFollow = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/unfollow/${userId}`, {
        method: "PATCH",
      });

      if (res.ok) {
        router.refresh();
        toast.success("Unfollow successfully.");
      }
    } catch (error) {
      toast.error("Failed to unfollow user");
    } finally {
      setLoading(false);
    }
  }, [router, userId]);

  const onCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied.");
  };

  return (
    <div className="my-8">
      {sessionId === userId ? (
        <div className="flex justify-between space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => router.push(`/profile/${data.id}/edit`)}
          >
            Edit Profile
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={onCopy}
          >
            Copy Profile Link
          </Button>
        </div>
      ) : data.followers?.includes(sessionId) ? (
        <Button
          variant="outline"
          disabled={loading}
          onClick={() => startTransition(unFollow)}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          variant="outline"
          disabled={loading}
          onClick={() => startTransition(follow)}
        >
          Follow
        </Button>
      )}
    </div>
  );
}
