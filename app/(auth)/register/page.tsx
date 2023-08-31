import RegisterForm from "@/components/forms/register-form";
import { Card, CardTitle } from "@/components/ui/card";

export default async function Page() {
  return (
    <div>
      <Card className="sm:p-8 p-4">
        <CardTitle>Create an account</CardTitle>
        <div className="mt-8">
          <RegisterForm />
        </div>
      </Card>
    </div>
  );
}
