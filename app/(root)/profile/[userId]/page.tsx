import { redirect } from "next/navigation";

import ProfileButton from "@/components/profile/profile-button";
import ProfileInfo from "@/components/profile/profile-info";
import ProfileTabs from "@/components/profile/profile-tabs";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

interface Props {
  params: {
    userId: string;
  };
}

export default async function Page({ params }: Props) {
  const currentUser = await getAuthSession();
  const user = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  if (!user?.onboarded) {
    redirect("/onboarding");
  }

  const threads = await prisma.post.findMany({
    where: {
      userId: user.id,
    },
    include: {
      user: true,
      images: true,
      replies: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 text-center">Profile</h1>
      <div className="mt-6">
        <ProfileInfo data={user} />
        <ProfileButton
          sessionId={currentUser?.user.id as string}
          userId={params.userId}
          data={user}
        />
        <ProfileTabs
          userThreads={threads}
          sessionId={currentUser?.user.id as string}
        />
      </div>
    </div>
  );
}
