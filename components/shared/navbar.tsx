"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data } = useSession();
  const router = useRouter();

  return (
    <nav className="sticky top-0 w-full z-30 bg-white/60">
      <div className="h-14 flex items-center justify-center relative backdrop-blur-lg">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <Image
            src="/assets/threads.svg"
            width={30}
            height={30}
            alt="Threads Logo"
          />
        </div>
        <div className="absolute right-6">
          {data?.user ? (
            <Button
              size="sm"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button size="sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
