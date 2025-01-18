"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetPasswordSchema } from "@/schemas";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ReserPassword } from "@/actions/reset-password";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

function ResetPasswordPage() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [success, setSuccess] = React.useState<boolean>(false);
  const searchParam = useSearchParams();

  const code = searchParam.get("code");
  const error = searchParam.get("error");
  const error_code = searchParam.get("error_code");
  const error_description = searchParam.get("error_description");

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    startTransition(() => {
      ReserPassword(values).then((result) => {
        if (result.success) {
          form.reset();
          toast.success(result.success);
          setSuccess(true);
        } else if (result.error) {
          toast.error(result.error.message);
        }
      });
    });
  }

  if (!isMounted) {
    return null;
  }

  if (error && error_code && error_description) {
    return (
      <div className="w-full h-screen bg-background flex items-center justify-center">
        <Card className="w-11/12 lg:w-1/3">
          <CardHeader className="text-center">
            <CardTitle className="text-destructive">sorry!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-center text-destructive">
              {error_description}
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/login">Go back to Login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!error && code) {
    return (
      <div className="w-full h-screen bg-background flex items-center justify-center">
        <Card className="w-11/12 lg:w-1/3">
          <CardHeader className="text-center">
            <CardTitle>Enter your New Password</CardTitle>
          </CardHeader>
          <CardContent>
            {!success && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="shadcn"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="shadcn"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                      <PulseLoader color="#333" size={5} />
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </form>
              </Form>
            )}
            {success && (
              <div className="flex flex-col items-center gap-y-4">
                <p className="text-sm text-center text-green-500">
                  Password has been reset successfully!
                </p>
                <Button asChild>
                  <Link href="/login">Go back to Login</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-background flex items-center justify-center">
      <Card className="w-11/12 lg:w-1/3">
        <CardHeader className="text-center">
          <CardTitle className="text-destructive">Sorry!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-center text-destructive">
            Something went wrong! Please try again later.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/login">Go back to Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ResetPasswordPage;
