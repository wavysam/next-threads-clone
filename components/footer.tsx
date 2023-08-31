import { PenSquare, User2, Home } from "lucide-react";

export default function Footer() {
  return (
    <footer className="sticky bottom-0 w-full bg-white z-50 border-t">
      <div className="h-14 flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer">
            <Home size={24} />
          </div>
          <div className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer">
            <PenSquare size={24} />
          </div>
          <div className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer">
            <User2 size={24} />
          </div>
        </div>
      </div>
    </footer>
  );
}
