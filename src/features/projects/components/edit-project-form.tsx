"use client";

import { useRef } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

import { DottedSeparator } from "@/components/dotted-separator";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, CopyIcon } from "lucide-react";

import { Project } from "../types";
import { useUpdateProject } from "../api/use-update-project";
import { useDeleteProject } from "../api/use-delete-project";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useConfirm } from "@/hooks/use-confirm";
import { updateProjectSchema } from "../schemas";

interface EditProjectFormProps {
  onCancel?: () => void;
  initialValues: Project;
}

export const EditProjectForm = ({
  onCancel,
  initialValues,
}: EditProjectFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useUpdateProject();
  const { mutate: deleteProject, isPending: isDeletingProject } =
    useDeleteProject();

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Project",
    "This action cannot be undone.",
    "destructive"
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      ...initialValues,
    },
  });

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) return;

    deleteProject(
      {
        param: { projectId: initialValues.$id },
      },
      {
        onSuccess: () => {
          window.location.href = `/workspaces/${initialValues.workspaceId}`;
        },
      }
    );
  };

  const OnSubmit = (values: z.infer<typeof updateProjectSchema>) => {
    const finalValues = {
      ...values,
    };
    mutate({
      form: { name: values.name },
      param: { projectId: initialValues.$id },
    });
  };

  return (
    <div className={"flex flex-col gap-y-4"}>
      <DeleteDialog />
      <Card className={"w-full h-full border-none shadow-none"}>
        <CardHeader
          className={"flex flex-row items-center gap-x-4 p-7 space-y-0"}
        >
          <Button
            size="sm"
            variant="secondary"
            onClick={
              onCancel
                ? onCancel
                : () =>
                    router.push(
                      `/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`
                    )
            }
          >
            <ArrowLeftIcon className={"size-4 "} />
            Back
          </Button>
          <CardTitle className={"text-xl font-bold"}>
            {initialValues.name}
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
              <div
                className={
                  "md:flex flex flex-col md:justify-between md:items-center  justify-center"
                }
              >
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
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className={"w-full h-full border-none shadow-none"}>
        <CardContent className={"p-7"}>
          <div className={"flex flex-col"}>
            <h3 className={"font-bold"}>Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a Project is irreversible and will remove all associated
              data.
            </p>
          </div>
          <DottedSeparator className={"py-7"} />

          <Button
            className={"mt-6 w-fit ml-auto flex justify-end"}
            size="sm"
            variant="destructive"
            type="button"
            disabled={isPending}
            onClick={handleDelete}
          >
            Delete Project
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
