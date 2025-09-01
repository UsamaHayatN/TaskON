"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpWithGithub, signUpWithGoogle } from "@/lib/oauth";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { registerSchema } from "@/features/auth/schemas";
import { useRegister } from "@/features/auth/api/use-register";

const SignUpCard = () => {
  const { mutate, isPending } = useRegister();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    mutate({ json: values });
  };
  return (
    <div>
      <Card className="w-full h-full md:w-[487px] border-none shadow-none">
        <CardHeader>
          <CardTitle className={"font-normal text-center text-3xl pb-2"}>
            Sign Up
          </CardTitle>
          <CardDescription>
            By signing up,you agree to our{" "}
            <Link href="/privacy">
              <span className={"text-blue-700"}>Privacy Policy</span>
            </Link>{" "}
            <span>&</span>
            <Link href="/terms">
              <span className={"text-blue-700"}> Terms of Service</span>
            </Link>{" "}
          </CardDescription>
        </CardHeader>
        <div className={"px-7 "}>
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter your name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter email address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="primary"
                disabled={isPending}
                className={"w-full"}
                size="lg"
              >
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
        <div className={"px-7 mb-5"}>
          <DottedSeparator />
        </div>
        <CardContent className={"flex flex-col gap-y-4"}>
          <Button
            onClick={() => signUpWithGoogle()}
            disabled={isPending}
            variant="secondary"
            size="lg"
            className={"w-full"}
          >
            <FcGoogle className={"mr-2 size-7"} /> Login with Google{" "}
          </Button>
          <Button
            onClick={() => signUpWithGithub()}
            disabled={isPending}
            variant="secondary"
            size="lg"
            className={"w-full"}
          >
            <FaGithub className={"mr-2 size-7"} />
            Login with Github{" "}
          </Button>
        </CardContent>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7 flex items-center justify-center">
          <p>
            Already have an account?
            <Link href="/sign-in">
              <span className={"text-blue-700"}>&nbsp;Sign In</span>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpCard;
