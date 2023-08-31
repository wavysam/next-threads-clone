import LoginForm from "@/components/forms/login-form";
import { Card, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div>
      <Card className="sm:p-8 p-4">
        <CardTitle>Welcome back</CardTitle>
        <div className="mt-8">
          <LoginForm />
        </div>
      </Card>
    </div>
  );
}
