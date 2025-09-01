"use client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { createTaskSchema } from "../schemas";
import { useCreateTask } from "../api/use-create-task";
import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/date-picker";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskStatus } from "../types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

interface CreateTaskFormProps {
  onCancel?: () => void;
  projectOptions: { id: string; name: string }[];
  memberOptions: { id: string; name: string }[];
}

export const CreateTaskForm = ({
  onCancel,
  projectOptions,
  memberOptions,
}: CreateTaskFormProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { mutate, isPending } = useCreateTask();

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema.omit({ workspaceId: true })),
    defaultValues: {
      workspaceId,
    },
  });

  const OnSubmit = async (values: z.infer<typeof createTaskSchema>) => {
    try {
      mutate(
        { json: { ...values, workspaceId } },
        {
          onSuccess: ({ data }) => {
            // Push notification with task name and assignee name
            const assignee = memberOptions.find(
              (member) => member.id === values.assigneeId
            );
            const notificationMessage = `${values.name} has been assigned to ${assignee?.name}`;

            // Call the server action for notification
            // addNotificationAction(notificationMessage);
          },
          onError: (error) => {
            console.error("Error creating Task  :", error);
          },
        }
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Card className={"w-full h-full border-none shadow-none"}>
      <CardHeader className={"flex p-7"}>
        <CardTitle className={"text-xl font-bold"}>Create a new task</CardTitle>
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
                      Task Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={"Enter Task Name"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={"text-lg font-medium"}>
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={"Enter task description"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={"text-lg font-medium"}>
                      Due Date
                    </FormLabel>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assigneeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={"text-lg font-medium"}>
                      Assignee
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {memberOptions.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            <div className="flex items-center gap-x-2">
                              <MemberAvatar
                                className="size-6"
                                name={member.name}
                              />
                              {member.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={"text-lg font-medium"}>
                      Status
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        <SelectItem value={TaskStatus.BACKLOG}>
                          Backlog
                        </SelectItem>
                        <SelectItem value={TaskStatus.IN_PROGRESS}>
                          In Progress
                        </SelectItem>
                        <SelectItem value={TaskStatus.IN_REVIEW}>
                          In Review
                        </SelectItem>
                        <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
                        <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={"text-lg font-medium"}>
                      Project
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Project" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {projectOptions.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            <div className="flex items-center gap-x-2">
                              <ProjectAvatar
                                className="size-6"
                                name={project.name}
                              />
                              {project.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-x-4 mt-4">
                <Button
                  variant={"ghost"}
                  onClick={onCancel}
                  className="w-32"
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-32"
                  variant={"tertiary"}
                  disabled={isPending}
                >
                  {isPending ? "Creating..." : "Create Task"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
