import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Thread from "../thread";
import { Post } from "@/types";

interface Props {
  userThreads: Post[];
}

export default function ProfileTabs({ userThreads }: Props) {
  return (
    <div>
      <Tabs defaultValue="threads">
        <TabsList className="grid w-full grid-cols-2 bg-transparent">
          <TabsTrigger
            value="threads"
            className="data-[state=active]:border-b data-[state=active]:border-b-gray-900 data-[state=active]:shadow-none rounded-none"
          >
            Threads
          </TabsTrigger>
          <TabsTrigger
            value="replies"
            className="data-[state=active]:border-b data-[state=active]:border-b-gray-900 data-[state=active]:shadow-none rounded-none"
          >
            Replies
          </TabsTrigger>
        </TabsList>
        <TabsContent value="threads">
          <div className="mt-3">
            {userThreads.length === 0 && (
              <p className="text-center">
                You have&apos;nt posted any threads yet.
              </p>
            )}
            {userThreads.map((thread) => (
              <Thread key={thread.id} data={thread} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="replies">
          <div className="text-center mt-3">
            <p>You have&apos;nt posted any replies yet.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
