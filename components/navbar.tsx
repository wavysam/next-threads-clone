"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data } = useSession();
  console.log(data);

  return (
    <nav className="sticky top-0 w-full z-50 bg-white/60">
      <div className="h-14 flex items-center justify-center relative backdrop-blur-lg">
        <div>
          <Image
            src="/assets/threads.svg"
            width={30}
            height={30}
            alt="Threads Logo"
          />
        </div>
        <div className="absolute right-6">
          {data?.user ? (
            <Button size="sm">Logout</Button>
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
