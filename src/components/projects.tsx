"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { RiAddCircleFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

const Projects = () => {
  const pathname = usePathname();
  const { open } = useCreateProjectModal();
  const workspaceId = useWorkspaceId();
  const { data } = useGetProjects({ workspaceId });

  return (
    <div className={"flex flex-col gap-y-2"}>
      <div className="justify-start flex  ">
        <div className="h-12 flex bg-neutral-200 justify-start items-center py-2  px-2 w-42 hover:cursor-pointer rounded-full">
          <div>
            <RiAddCircleFill
              onClick={open}
              className={
                "size-10  text-[#169c70] cursor-pointer hover:opacity-75 transition "
              }
            />
          </div>
          <div className="text-sm font-medium ">Create New Project</div>
        </div>
      </div>
      <div className={"flex items-center pt-2"}>
        <p className={"text-xs uppercase text-neutral-100"}>Projects</p>
      </div>

      {data?.documents.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
        const isActive = pathname === href;

        return (
          <Link href={href} key={project.$id}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <ProjectAvatar image={project.imageUrl} name={project.name} />
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Projects;
