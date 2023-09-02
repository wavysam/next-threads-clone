"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  profileImage: string;
  postId: string;
  username: string;
  userId: string;
}
const schema = z.object({
  text: z.string().nonempty(),
});

export default function ReplyForm({
  profileImage,
  postId,
  username,
  userId,
}: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof schema>) => {
    try {
      const res = await fetch("/api/reply", {
        method: "POST",
        body: JSON.stringify({
          ...value,
          postId,
          userId,
        }),
      });

      if (res.ok) {
        form.reset();
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="text"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-start gap-2">
              <Avatar className="h-14 w-14">
                <AvatarImage
                  src={profileImage as string}
                  className="object-cover object-center"
                />
                <AvatarFallback />
              </Avatar>
              <FormControl>
                <Textarea
                  {...field}
                  rows={5}
                  placeholder={`Reply to ${username}...`}
                  className="focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <Button disabled={form.formState.isSubmitting}>Reply</Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
