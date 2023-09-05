import LoginForm from "@/components/forms/login-form";
import { Card, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const currentUser = await getAuthSession();

  if (currentUser?.user) {
    redirect("/");
  }

  return (
    <div className="w-full">
      <Card className="sm:p-8 p-4">
        <CardTitle>Welcome back</CardTitle>
        <div className="mt-8">
          <LoginForm />
        </div>
      </Card>
    </div>
  );
}
