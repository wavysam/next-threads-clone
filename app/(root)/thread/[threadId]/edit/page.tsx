import { getUserInfo } from "@/actions/get-user-info";
import { getThreadById } from "@/actions/thread";
import ThreadForm from "@/components/forms/thread-form";

interface Props {
  params: {
    threadId: string;
  };
}

export default async function Page({ params }: Props) {
  const thread = await getThreadById(params.threadId);
  const user = await getUserInfo();

  return (
    <div>
      <h1 className="text-2xl font-bold tex-gray-800 text-center">
        Edit Thread
      </h1>
      <div className="mt-6">
        <ThreadForm data={user} initialData={thread} />
      </div>
    </div>
  );
}
