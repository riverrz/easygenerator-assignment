import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SignupForm } from "./components/signup-form";

export function SignupPage() {
  const navigate = useNavigate();

  const onSuccessfulSignup = () => {
    navigate("/");
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <Card className="max-w-[350px] w-[90vw]">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Enter your credentials below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm onSuccess={onSuccessfulSignup} />
        </CardContent>
      </Card>
    </main>
  );
}
