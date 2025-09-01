"use client";
import Image from "next/image";
import Link from "next/link";
import { DottedSeparator } from "@/components/dotted-separator";
import { Navigation } from "@/components/navigation";
import { WorkspaceSwitcher } from "@/components/workspace-switcher";
import { RiAddCircleFill } from "react-icons/ri";
import Projects from "./projects";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";

export const Sidebar = () => {
  const { open } = useCreateWorkspaceModal();

  return (
    <aside className="h-full bg-[#000000] p-2 w-full ">
      <Link href="/">
        <Image
          src="/ Logo-white.png"
          className={"flex justify-center items-center"}
          alt="logo"
          width={264}
          height={48}
        />
      </Link>
      <DottedSeparator className={"my-4"} />
      <div className="justify-start flex mt-5 ">
        <div className="h-12 flex bg-neutral-200 justify-start items-center py-2  px-2 w-42 hover:cursor-pointer rounded-full">
          <div>
            <RiAddCircleFill
              onClick={open}
              className={
                "size-10  text-[#169c70] cursor-pointer hover:opacity-75 transition "
              }
            />
          </div>
          <div className="text-sm font-medium ">Create New Workspace</div>
        </div>
      </div>
      <WorkspaceSwitcher />
      <DottedSeparator className={"my-4"} />
      <Navigation />
      <DottedSeparator className={"my-4"} />
      <Projects />
    </aside>
  );
};
