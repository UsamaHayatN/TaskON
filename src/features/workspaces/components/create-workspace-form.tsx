"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkspaceSchema } from "../schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
import { ImageIcon } from "lucide-react";

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useCreateWorkspace();

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const OnSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
    const finalValues = {
      ...values,
    };
    mutate(
      { json: { name: values.name } },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className={"w-full h-full border-none shadow-none"}>
      <CardHeader className={"flex p-7"}>
        <CardTitle className={"text-xl font-bold"}>
          Create a new Workspace
        </CardTitle>
      </CardHeader>
      <div className={"px-7"}>
        <DottedSeparator />
      </div>
      <CardContent className={"p-7"}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(OnSubmit)}>
            <div className={"flex flex-col gap-y-4"}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={"text-lg font-medium"}>
                      Workspace Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={"Enter Workspace here"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DottedSeparator className={"py-7"} />
            <div className={"flex justify-between items-center"}>
              <Button
                type="button"
                size="lg"
                variant="destructive"
                onClick={onCancel}
                disabled={isPending}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="custom"
                size="lg"
                disabled={isPending}
              >
                Create Workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
