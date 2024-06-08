import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as authService from "@/modules/auth/services/auth.service";
import { LoginForm } from "./components/login-form";
import { LoginRequestDto } from "../services/auth.types";
import { useToast } from "@/components/ui/use-toast";

export function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const onLoginSubmit = async (payload: LoginRequestDto) => {
    try {
      const response = await authService.login(payload);
      if (response.success) {
        toast({
          description: "Successfully logged in!",
        });
        return navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: response.error.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: (error as Error).message,
      });
    }
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
          <LoginForm onSubmit={onLoginSubmit} />
        </CardContent>
      </Card>
    </main>
  );
}
