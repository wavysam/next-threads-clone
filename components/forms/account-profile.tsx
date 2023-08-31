"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";

interface Props {
  data: {
    id: string;
    name: string;
    username: string;
    profileImage: string;
    bio: string;
  };
}

const schema = z.object({
  name: z.string().nonempty(),
  username: z.string().nonempty(),
  bio: z.string().nonempty(),
  profileImage: z.string().url().nonempty(),
});

export default function AccountProfile({ data }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { startUpload } = useUploadThing("imageUploader");
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data.name || "",
      username: data.username || "",
      bio: data.bio || "",
      profileImage: data.profileImage || "",
    },
  });

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";

        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const blob = values.profileImage;
    const isImageChanged = isBase64Image(blob);

    if (isImageChanged) {
      const upload = await startUpload(files);
      if (upload && upload[0]?.url) {
        values.profileImage = upload[0].url;
      }
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/user", {
        method: "PATCH",
        body: JSON.stringify({
          id: data.id,
          name: values.name,
          username: values.username,
          bio: values.bio,
          profileImage: values.profileImage,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="profileImage"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="flex justify-center">
                  {field.value ? (
                    <Avatar className="h-20 w-20 rounded-full border">
                      <AvatarImage src={field.value} />
                    </Avatar>
                  ) : (
                    <div className="flex justify-center items-center bg-gray-200 h-20 w-20 rounded-full border">
                      <ImageIcon className="object-contain text-gray-800" />
                    </div>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-4">
                <Label>Name</Label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-4">
                <Label>Username</Label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="bio"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-4">
                <Label>Bio</Label>
                <FormControl>
                  <Textarea rows={5} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button disabled={loading}>Continue</Button>
        </form>
      </Form>
    </>
  );
}
