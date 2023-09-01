import { redirect } from "next/navigation";

import { getUserInfo } from "@/actions/get-user-info";
import ProfileButton from "@/components/profile/profile-button";
import ProfileInfo from "@/components/profile/profile-info";
import ProfileTabs from "@/components/profile/profile-tabs";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

export default async function Page() {
  const session = await getAuthSession();
  const user = await getUserInfo(session?.user.id as string);

  if (!user?.onboarded) {
    redirect("/onboarding");
  }

  const threads = await prisma.post.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      user: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(threads);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 text-center">Profile</h1>
      <div className="mt-6">
        <ProfileInfo data={user} />
        <ProfileButton />
        <ProfileTabs userThreads={threads} />
      </div>
    </div>
  );
}
