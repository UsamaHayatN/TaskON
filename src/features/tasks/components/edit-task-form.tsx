"use client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { createTaskSchema } from "../schemas";
import { DottedSeparator } from "@/components/dotted-separator";
import {Task,TaskStatus } from "../types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useUpdateTask } from "../api/use-update-task";
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


interface EditTaskFormProps {
  onCancel?: () => void;
  projectOptions: { id: string; name: string }[];
  memberOptions: { id: string; name: string }[];
  initialValues:Task;
}

export const EditTaskForm = ({
  onCancel,
  projectOptions,
  memberOptions,
  initialValues,
}: EditTaskFormProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { mutate, isPending } = useUpdateTask();

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema.omit({ workspaceId: true,description:true })),
    defaultValues: {
      ...initialValues,
      dueDate:initialValues.dueDate ? new Date(initialValues.dueDate) : undefined,
    },
  });

  const OnSubmit = (values: z.infer<typeof createTaskSchema>) => {
    mutate({json: values, param:{taskId:initialValues.$id}},
      {
        onSuccess: ({ data }) => {},
        onError: (error) => {
          console.error("Error creating Task  :", error);
        },
      }
    );
  };

  return (
    <Card className={"w-full h-full border-none  shadow-none"}>
      <CardHeader className={"flex flex-col p-7"}>
        <CardTitle className={"text-xl font-bold text-center"}>Edit a Task   </CardTitle>
        <CardTitle className={"text-lg font-medium"}>{initialValues.name && ` ${initialValues.name}`}  </CardTitle>
        {initialValues.status && (
    <span className={"text-sm font-medium text-gray-500"}>
      Current Status: {initialValues.status}
    </span>
  )}
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
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
