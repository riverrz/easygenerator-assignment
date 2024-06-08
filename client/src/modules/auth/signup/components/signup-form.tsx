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

import { validatePassword } from "../../helpers";
import { Seperator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

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
    <div>
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
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      {...field}
                    />
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
      <div className="mt-4">
        <Seperator content="OR" />
        <p className="text-xs py-2 text-center">
          Already signed up? Click here to <Link to="/login" className="underline">login</Link>
        </p>
      </div>
    </div>
  );
};

const formSchema = z
  .object({
    email: z.string().email({
      message: "Email must be valid",
    }),
    name: z.string().min(1, { message: "Name is required" }),
    password: z.string(),
  })
  .superRefine(({ password }, ctx) => {
    const validationResponse = validatePassword(password);
    if (!validationResponse.isValid) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: validationResponse.errorMessage,
      });
    }
  });

export type RegisterFormValues = z.infer<typeof formSchema>;
