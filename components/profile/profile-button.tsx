import { Button } from "@/components/ui/button";

export default function ProfileButton() {
  return (
    <div className="my-8 flex justify-between space-x-4">
      <Button variant="outline" size="sm" className="w-full">
        Edit Profile
      </Button>
      <Button variant="outline" size="sm" className="w-full">
        Share Profile
      </Button>
    </div>
  );
}
