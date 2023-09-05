import { getUserInfo } from "@/actions/user";
import ThreadForm from "@/components/forms/thread-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const currentUser = await getUserInfo();

  if (!currentUser?.onboarded) {
    redirect("/onboarding");
  }
  return (
    <div>
      <h1 className="text-2xl font-bold tex-gray-800 text-center">
        New Thread
      </h1>
      <div className="mt-6">
        <ThreadForm data={currentUser} />
      </div>
    </div>
  );
}
