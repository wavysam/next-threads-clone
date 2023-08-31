import { Heart, MessageCircle } from "lucide-react";

export default function Thread() {
  return (
    <div className="border-b py-2">
      <div className="flex items-start">
        <div className="h-9 w-9 rounded-full bg-purple-700 border" />
        <div className="flex-1 ml-2">
          <div className="flex justify-between">
            <p className="font-semibold">appwrite.io</p>
            <p className="text-gray-500">2w</p>
          </div>
          <div className="mt-1">
            <p className="whitespace-pre-line">
              🎉 It’s time for our weekly digest! 🔥 And this week we have some
              exciting news to share with you, and of course, the GitHub
              repositories you need to know about! Let’s dive into this week:
              🧵1/5
            </p>
          </div>
          <div className="flex space-x-3 mt-3">
            <div className="cursor-pointer hover:bg-gray-100 p-1.5 rounded-full transition">
              <Heart />
            </div>
            <div className="cursor-pointer hover:bg-gray-100 p-1.5 rounded-full transition">
              <MessageCircle />
            </div>
          </div>
          <div className="flex space-x-3 text-gray-500 text-sm mt-1">
            <p>200 likes</p>
            <p>200 replies</p>
          </div>
        </div>
      </div>
    </div>
  );
}
