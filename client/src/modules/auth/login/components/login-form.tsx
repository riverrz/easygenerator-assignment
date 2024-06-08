import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginRequestDto } from "@/modules/auth/services/auth.types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Seperator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface Props {
  onSubmit: (payload: LoginRequestDto) => void;
}

export const LoginForm = ({ onSubmit }: Props) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onFormSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    await onSubmit(values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
          <div className="grid gap-4">
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
          Didn't signup? Click here to{" "}
          <Link to="/signup" className="underline">
            signup
          </Link>
        </p>
      </div>
    </div>
  );
};

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be valid",
  }),
  password: z.string().min(1, { message: "Password is required" }),
});
export type LoginFormValues = z.infer<typeof formSchema>;
