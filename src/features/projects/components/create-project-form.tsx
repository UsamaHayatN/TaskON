"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { createProjectSchema } from "../schemas";
import { useCreateProject } from "@/features/projects/api/use-create-project";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { PROJECTS_ID } from "@/config";

interface CreateProjectFormProps {
  onCancel?: () => void;
}

export const CreateProjectForm = ({ onCancel }: CreateProjectFormProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { mutate, isPending } = useCreateProject();

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema.omit({ workspaceId: true })),
    defaultValues: {
      name: "",
    },
  });

  const OnSubmit = (values: z.infer<typeof createProjectSchema>) => {
    if (!workspaceId) {
      console.error("Workspace ID is missing.");
      return;
    }

    const finalValues = {
      ...values,
      workspaceId,
    };

    mutate(
      { form: finalValues },
      {
        onSuccess: ({data}) => {
          form.reset();
           router.push(`/workspaces/${workspaceId}/projects/${data.$id}`);
        },
        onError: (error) => {
          console.error("Error creating project:", error);
        },
      }
    );
  };

  return (
    <Card className={"w-full h-full border-none shadow-none"}>
      <CardHeader className={"flex p-7"}>
        <CardTitle className={"text-xl font-bold"}>
          Create a new Project
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
                      Project Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={"Enter Project Name"} />
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
                Create Project
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
