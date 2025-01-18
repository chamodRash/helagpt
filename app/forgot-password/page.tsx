"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ForgotPasswordSchema } from "@/schemas";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ForgotPassword } from "@/actions/forgot-password";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

function ForgotPasswordPage() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
    startTransition(() => {
      ForgotPassword(values).then((result) => {
        if (result.success) {
          form.reset();
          toast.success(result.success);
        } else if (result.error) {
          toast.error(result.error.message);
        }
      });
    });
  }

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full h-screen bg-background flex items-center justify-center">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Forgot your Password?</CardTitle>
          <CardDescription>
            Don&apos;t worry we got you covered!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please enter a valid email address. We will send you a
                      link to reset your password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <PulseLoader color="#333" size={5} /> : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="text-center text-sm mt-6 w-full">
            Don&apos;t have an account? <Link href="/register">Sign up</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ForgotPasswordPage;
