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
import ImageUpload from "../image-upload";

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
  const [loading, setLoading] = useState(false);
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

  const onSubmit = async (values: z.infer<typeof schema>) => {
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
                      <AvatarImage
                        src={field.value}
                        className="object-cover object-center"
                      />
                    </Avatar>
                  ) : (
                    <div className="flex justify-center items-center bg-gray-200 h-20 w-20 rounded-full border">
                      <ImageIcon className="object-contain text-gray-800" />
                    </div>
                  )}
                </FormLabel>
                <Label>Profile Image</Label>
                <FormControl>
                  <ImageUpload onChange={(url) => field.onChange(url)} />
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
