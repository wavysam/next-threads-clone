"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useRouter } from "next/navigation";

interface Props {
  sessionId: string;
  userId: string;
  data: User;
}

export default function ProfileButton({ sessionId, userId, data }: Props) {
  const router = useRouter();

  const follow = async () => {
    try {
      const res = await fetch(`/api/user/follow/${userId}`, {
        method: "PATCH",
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
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
        <Button variant="outline">Unfollow</Button>
      ) : (
        <Button variant="outline" onClick={follow}>
          Follow
        </Button>
      )}
    </div>
  );
}
