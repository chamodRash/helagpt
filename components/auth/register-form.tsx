"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaFacebookF } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { emailRegister } from "@/actions/register";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import { signInWith } from "@/actions/oAuth";

export function RegisterForm() {
  const [mounted, setMounted] = useState(false);
  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    startTransition(() => {
      emailRegister(values).then((result) => {
        if (result.error) {
          toast.error(result.error);
        } else if (result.success) {
          toast(result.success, {
            duration: 20000,
            icon: "👏",
          });
        }
      });
    });
  }

  function handleGoogleLogin(provider: "google" | "facebook") {
    startTransition(() => {
      signInWith({ provider });
    });
  }

  // Ensure theme is loaded before rendering (to prevent hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={"flex flex-col gap-6"}>
      <Card className="relative">
        {!isEmailLogin && (
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome!</CardTitle>
            <CardDescription>
              Register with your social or email account
            </CardDescription>
          </CardHeader>
        )}
        {isEmailLogin && (
          <CardHeader className="flex flex-row gap-x-5 items-center">
            <Button
              size={"icon"}
              variant={"outline"}
              className="bg-transparent"
              disabled={isPending}
              onClick={() => {
                setIsEmailLogin(false);
              }}>
              <FaAngleLeft />
            </Button>
            <div className="flex flex-col justify-center">
              <CardTitle className="text-xl">Welcome!</CardTitle>
              <CardDescription>
                Register with your E-mail account
              </CardDescription>
            </div>
          </CardHeader>
        )}

        {isEmailLogin && (
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  disabled={isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  disabled={isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  disabled={isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="shadcn"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full flex items-center gap-x-3">
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                      <PulseLoader color="#333" size={5} />
                    ) : (
                      "Register"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
            <div className="text-center text-sm mt-6">
              Already have an account? <Link href="/login">Sign in</Link>
            </div>
          </CardContent>
        )}
        {!isEmailLogin && (
          <CardContent>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isPending}
                  onClick={() => handleGoogleLogin("facebook")}>
                  <FaFacebookF />
                  Register with Facebook
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleGoogleLogin("google")}
                  disabled={isPending}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Register with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsEmailLogin(true);
                  }}
                  disabled={isPending}>
                  <HiOutlineMail />
                  Register with E-mail
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account? <Link href="/login">Sign in</Link>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
