import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types";

interface Props {
  data: User;
}

export default function ProfileInfo({ data }: Props) {
  return (
    <div className="grid grid-cols-12 gap-4 items-center">
      <div className="col-span-8">
        <h1 className="text-2xl font-medium">{data.name}</h1>
        <div className="flex items-center space-x-3">
          <p>{data.username}</p>
          <p className="py-1 px-3 rounded-full bg-gray-100 text-xs">
            reThreads.net
          </p>
        </div>
        <p className="text-sm text-gray-500 mt-2">0 followers</p>
      </div>
      <div className="col-span-4 flex justify-end">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={data.profileImage as string}
            className="object-cover object-center"
          />
          <AvatarFallback />
        </Avatar>
      </div>
    </div>
  );
}
