import AccountProfile from "@/components/forms/account-profile";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getAuthSession();

  const userInfo = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  const userData = {
    id: userInfo?.id as string,
    username: userInfo?.username || "",
    name: userInfo?.name || "",
    bio: userInfo?.bio || "",
    profileImage: userInfo?.profileImage || "",
  };

  if (userInfo?.onboarded) {
    redirect("/");
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-500 mt-2">Customize your Threads Profile</p>
      </div>
      <div className="mt-10">
        <AccountProfile data={userData} />
      </div>
    </div>
  );
}
