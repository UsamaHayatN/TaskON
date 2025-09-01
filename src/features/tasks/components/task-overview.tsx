import { Button } from "@/components/ui/button";
import { Task } from "../types";
import { PencilIcon } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";
import { OverviewProperty } from "./overview-property";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { TaskDate } from "./task-date";
import { Badge } from "@/components/ui/badge";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";


interface TaskOverviewProps {
  task: Task;
}

export const TaskOverview = ({ task }: TaskOverviewProps) => {
  const {open}=useEditTaskModal();
  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-white">Task Detail</p>
          <Button size="sm" onClick={()=> open(task.$id)} variant="secondary">
            <PencilIcon className="size-4 mr-2" />
            Edit
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <div className="flex flex-col gap-y-4 ">
          <OverviewProperty label="Task Name">
            
            <p className="text-[22px] font-medium text-white">{task.name}</p>
          </OverviewProperty>
          <OverviewProperty label="Assignee">
            <MemberAvatar name={task.assignee.name} className="size-8" />
            <p className="text-[22px] font-medium text-white">{task.assignee.name}</p>
          </OverviewProperty>
          <OverviewProperty label="Due Date">
            <TaskDate value={task.dueDate} className="text-[22px] font-medium" />
          </OverviewProperty>
          <OverviewProperty label="Status">
            <Badge variant={task.status}>
              {snakeCaseToTitleCase(task.status)}
            </Badge>
          </OverviewProperty>
         
          
          

        </div>
      </div>
    </div>
  );
};
