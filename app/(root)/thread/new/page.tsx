import { getUserInfo } from "@/actions/get-user-info";
import ThreadForm from "@/components/forms/thread-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUserInfo();

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
