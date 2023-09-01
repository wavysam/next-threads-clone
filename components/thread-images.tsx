import { cn } from "@/lib/utils";
import { Image as ImageType } from "@prisma/client";
import Image from "next/image";

interface Props {
  data: ImageType[];
}

export default function ThreadImages({ data }: Props) {
  return (
    <div
      className={cn(
        "grid gap-4",
        data.length === 1 ? "grid-cols" : "grid-cols-2"
      )}
    >
      {data.map((image) => (
        <div key={image.url} className="relative flex h-[200px] snap-center">
          <Image
            src={image.url}
            fill
            alt=""
            className="object-cover object-center rounded-md"
          />
        </div>
      ))}
    </div>
  );
}
