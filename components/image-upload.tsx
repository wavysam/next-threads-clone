"use client";

import { CldUploadButton } from "next-cloudinary";
import { Button } from "./ui/button";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onRemove?: (value: string) => void;
}

export default function ImageUpload({ value, onChange, onRemove }: Props) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        {/* {value.map((url) => ( */}
        <div className="relative flex h-[150px] w-[150px]">
          {/* <div className="absolute z-50 top-2 right-2">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onRemove(url)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div> */}
          <Image
            src={value.url}
            alt="Product Image"
            fill
            className="object-cover object-center"
          />
        </div>
        {/* // ))} */}
      </div>
      <CldUploadButton onUpload={onUpload} uploadPreset="lkos5rhl">
        <div className="flex items-center gap-1 bg-gray-100 p-3 rounded-md">
          <ImagePlus />
          <span>Upload image</span>
        </div>
      </CldUploadButton>
    </div>
  );
}
