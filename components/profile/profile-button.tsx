"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { User } from "@/types";

interface Props {
  sessionId: string;
  userId: string;
  data: User;
}

export default function ProfileButton({ sessionId, userId, data }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const follow = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/follow/${userId}`, {
        method: "PATCH",
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const unFollow = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/unfollow/${userId}`, {
        method: "PATCH",
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-8">
      {sessionId === userId ? (
        <div className="flex justify-between space-x-4">
          <Button variant="outline" size="sm" className="w-full">
            Edit Profile
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            Share Profile
          </Button>
        </div>
      ) : data.followers?.includes(sessionId) ? (
        <Button variant="outline" disabled={loading} onClick={unFollow}>
          Unfollow
        </Button>
      ) : (
        <Button variant="outline" disabled={loading} onClick={follow}>
          Follow
        </Button>
      )}
    </div>
  );
}
