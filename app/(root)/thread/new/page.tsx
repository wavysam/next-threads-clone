import { getUserInfo } from "@/actions/get-user-info";
import ThreadForm from "@/components/forms/thread-form";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getAuthSession();
  const user = await getUserInfo(session?.user.id as string);

  if (!user?.onboarded) {
    redirect("/onboarding");
  }
  return (
    <div>
      <h1 className="text-2xl font-bold tex-gray-800 text-center">
        New Thread
      </h1>
      <div className="mt-6">
        <ThreadForm data={user} />
      </div>
    </div>
  );
}
