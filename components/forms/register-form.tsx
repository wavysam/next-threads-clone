"use client";

import { useCallback, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

const schema = z
  .object({
    name: z.string().nonempty({ message: "Name must not be empty." }),
    username: z.string().nonempty({ message: "Username must not be empty." }),
    email: z
      .string()
      .nonempty({ message: "Email must not be empty." })
      .email({ message: "Invalid email." }),
    password: z.string().nonempty({ message: "Password must not be empty." }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm password must not be empty." }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password don't match.",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof schema>) => {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify(values),
        });

        if (res.ok) {
          await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          });
          router.refresh();
          router.push("/onboarding");
          toast.success("Register successfully.");
        }
      } catch (error) {
        toast.error("Failed to register.");
      } finally {
        setLoading(false);
      }
    },
    [router]
  );
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-3">
                <Label>Name</Label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-3">
                <Label>Username</Label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-3">
                <Label>Email</Label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-3">
                <Label>Password</Label>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-3">
                <Label>Confirm password</Label>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" disabled={loading}>
            Register
          </Button>
          <div className="text-center space-x-1.5 mt-3">
            <span className="text-gray-500">Already have an account?</span>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
