"use client";

import { CldUploadButton } from "next-cloudinary";
import { Input } from "./ui/input";

interface Props {
  // value: string;
  onChange: (value: string) => void;
}

export default function ImageUpload({ onChange }: Props) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <CldUploadButton
        onUpload={onUpload}
        uploadPreset="mqira8bg"
        className="w-full mt-1"
      >
        <Input type="file" />
      </CldUploadButton>
    </div>
  );
}
