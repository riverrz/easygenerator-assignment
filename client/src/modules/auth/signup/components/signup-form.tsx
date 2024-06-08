import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignupResponseDto } from "@/modules/auth/services/auth.types";
import * as authService from "@/modules/auth/services/auth.service";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import {
  containsLetter,
  containsNumber,
  containsSpecialCharacter,
} from "@/utils/utils";

interface Props {
  onSuccess: (payload: SignupResponseDto) => void;
}

export const SignupForm = ({ onSuccess }: Props) => {
  const { toast } = useToast();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onFormSubmit: SubmitHandler<RegisterFormValues> = async (values) => {
    try {
      const response = await authService.signup(values);
      if (response.success) {
        toast({
          description: "Successfully signed up!",
        });
        return onSuccess(response.data);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-6 flex justify-center">
          <Button className="w-full" isLoading={isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

const formSchema = z
  .object({
    email: z.string().email({
      message: "Email must be valid",
    }),
    password: z.string().min(8, {
      message: "Password must be atleast 8 characters",
    }),
    name: z.string().min(1, { message: "Name is required" }),
  })
  .superRefine(({ password }, ctx) => {
    let errorMessage = "";
    if (!containsLetter(password)) {
      errorMessage = "Password must have 1 letter";
    } else if (!containsNumber(password)) {
      errorMessage = "Password must have 1 number";
    } else if (!containsSpecialCharacter(password)) {
      errorMessage = "Password must have 1 special character";
    }
    if (errorMessage) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: errorMessage,
      });
    }
  });

export type RegisterFormValues = z.infer<typeof formSchema>;
