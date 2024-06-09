import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as authService from "@/modules/auth/services/auth.service";
import { SignupForm } from "./components/signup-form";
import { SignupRequestDto } from "../services/auth.types";
import { useToast } from "@/components/ui/use-toast";

export function SignupPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSignupSubmit = async (payload: SignupRequestDto) => {
    try {
      const response = await authService.signup(payload);
      if (response.success) {
        toast({
          description:
            "Successfully signed up! Please login with your new credentials",
        });
        return navigate("/login");
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
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Enter your credentials below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm onSubmit={onSignupSubmit} />
        </CardContent>
      </Card>
    </main>
  );
}
