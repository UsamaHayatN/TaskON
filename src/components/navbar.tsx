"use client";

import { usePathname } from "next/navigation";

import { UserButton } from "@/features/auth/components/user-button";

import { MobileSidebar } from "@/components/mobile-sidebar";
import { House } from "lucide-react";

const pathnameMap = {
  tasks: {
    title: "My Tasks",
    description: "View all of your tasks here",
  },
  projects: {
    title: "My Projects",
    description: "View tasks of your project here",
  },
};

const defaultMap = {
  title: "Home",
  description: "Monitor all of your projects and tasks here",
};

export const Navbar = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

  const { title, description } = pathnameMap[pathnameKey] || defaultMap;

  return (
    <nav className={"pt-4 px-6 flex items-center justify-between"}>
      <div className={"flex-col hidden lg:flex"}>
        <div className="flex items-center gap-2">
        <House />
        <h1 className={"text-2xl font-semibold"}>{title}</h1>
        </div>
        <p className={"text-muted-foreground"}>{description}</p>
      </div>
      <MobileSidebar />
      <div className="flex gap-4">
      {/* <Notifications   /> */}
      <UserButton />
      </div>
     
    </nav>
  );
};
