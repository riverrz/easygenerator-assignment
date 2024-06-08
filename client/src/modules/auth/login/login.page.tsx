import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LoginForm } from "./components/login-form";

export function LoginPage() {
  const navigate = useNavigate();

  const onSuccessfulLogin = () => {
    navigate("/");
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <Card className="max-w-[350px] w-[90vw]">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>
            Enter your credentials below to log in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSuccess={onSuccessfulLogin} />
        </CardContent>
      </Card>
    </main>
  );
}
