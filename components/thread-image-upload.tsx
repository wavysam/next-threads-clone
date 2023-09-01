"use client";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

import { ImAttachment } from "react-icons/im";
import { BiX } from "react-icons/bi";

interface Props {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (id: string) => void;
}

export default function ThreadImageUpload({
  value,
  onChange,
  onRemove,
}: Props) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {value?.map((url) => (
          <div key={url} className="h-[150px] flex relative">
            <div className="absolute z-10 top-1 right-1">
              <div
                className="p-1 bg-gray-200/70 rounded-full cursor-pointer shadow-md hover:bg-gray-200/100 transition"
                onClick={() => onRemove(url)}
              >
                <BiX size={20} />
              </div>
            </div>
            <Image
              src={url}
              fill
              alt=""
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div>
        <CldUploadButton
          onUpload={onUpload}
          uploadPreset="mqira8bg"
          className="p-2 hover:bg-gray-100 rounded-full transition flex items-center space-x-2"
        >
          <ImAttachment />
          <p>Add attachment</p>
        </CldUploadButton>
      </div>
    </div>
  );
}
