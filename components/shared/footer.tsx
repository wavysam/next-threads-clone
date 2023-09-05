"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiHomeAlt2 } from "react-icons/bi";
import { LuEdit } from "react-icons/lu";
import { AiOutlineUser } from "react-icons/ai";
import { cn } from "@/lib/utils";

export default function Footer() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      icon: <BiHomeAlt2 size={25} />,
      active: pathname === "/",
    },
    {
      href: "/thread/new",
      icon: <LuEdit size={25} />,
      active: pathname === "/thread/new",
    },
    {
      href: `/profile/${session?.user.id}`,
      icon: <AiOutlineUser size={25} />,
      active: pathname === `/profile/${session?.user.id}`,
    },
  ];

  return (
    <footer className="fixed bottom-0 w-full bg-white z-30 border-t">
      <div className="h-14 flex items-center justify-center">
        <div className="flex items-center space-x-4">
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              <div
                className={cn(
                  "p-2 hover:bg-gray-100 rounded-full transition cursor-pointer",
                  route.active && "bg-gray-200"
                )}
              >
                {route.icon}
              </div>
            </Link>
          ))}
          {/* <Link href="/thread/new">
            <div className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer">
              <PenSquare size={24} />
            </div>
          </Link>
          <Link href={`/profile/${session?.user.id}`}>
            <div className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer">
              <User2 size={24} />
            </div>
          </Link> */}
        </div>
      </div>
    </footer>
  );
}
