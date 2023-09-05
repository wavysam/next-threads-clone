"use client";

import { useCallback } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import ThreadImageUpload from "../uploads/thread-image-upload";
import { Post } from "@/types";
import { toast } from "react-hot-toast";

interface Props {
  data: User | null;
  initialData?: Post | null;
}

const schema = z.object({
  thread: z.string().nonempty(),
  images: z.object({ url: z.string() }).array(),
});

export default function ThreadForm({ data, initialData }: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      thread: initialData?.thread || "",
      images: initialData?.images || [],
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof schema>) => {
      if (initialData) {
        try {
          const res = await fetch(`/api/thread/${initialData.id}`, {
            method: "PATCH",
            body: JSON.stringify(values),
          });

          if (res.ok) {
            router.push("/");
            router.refresh();
            toast.success("Thread updated.");
          }
        } catch (error) {
          toast.error("Failed to update thread.");
        }
      } else {
        try {
          const res = await fetch("/api/thread", {
            method: "POST",
            body: JSON.stringify(values),
          });

          if (res.ok) {
            router.push("/");
            router.refresh();
            toast.success("Thread created.");
          }
        } catch (error) {
          toast.error("Failed to create thread.");
        }
      }
    },
    [initialData, router]
  );

  return (
    <div>
      <div className="flex items-start space-x-2">
        <Avatar>
          <AvatarImage
            src={data?.profileImage as string}
            className="object-cover object-center"
          />
          <AvatarFallback />
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold">{data?.username}</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
              <FormField
                name="thread"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={8}
                        placeholder="Start a thread..."
                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="images"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <ThreadImageUpload
                        value={field.value.map((image) => image.url)}
                        onChange={(url) =>
                          field.onChange([...field.value, { url }])
                        }
                        onRemove={(url) =>
                          field.onChange(
                            field.value.filter((image) => image.url !== url)
                          )
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button disabled={form.formState.isSubmitting}>
                {initialData ? "Update" : "Post"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
