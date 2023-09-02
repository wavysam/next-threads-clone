"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import ThreadImageUpload from "../thread-image-upload";
import { useRouter } from "next/navigation";
import { Post } from "@/types";

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

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (initialData) {
      try {
        const res = await fetch(`/api/thread/${initialData.id}`, {
          method: "PATCH",
          body: JSON.stringify(values),
        });

        if (res.ok) {
          router.push("/");
          router.refresh();
        }
      } catch (error) {
        console.log(error);
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
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

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
