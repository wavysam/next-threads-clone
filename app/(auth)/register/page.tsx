import RegisterForm from "@/components/forms/register-form";
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
        <CardTitle>Create an account</CardTitle>
        <div className="mt-8">
          <RegisterForm />
        </div>
      </Card>
    </div>
  );
}
