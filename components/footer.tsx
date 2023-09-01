import { PenSquare, User2, Home } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-white z-50 border-t">
      <div className="h-14 flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <div className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer">
              <Home size={24} />
            </div>
          </Link>
          <Link href="/thread/new">
            <div className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer">
              <PenSquare size={24} />
            </div>
          </Link>
          <Link href="/profile">
            <div className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer">
              <User2 size={24} />
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
}
