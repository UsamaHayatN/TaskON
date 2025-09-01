"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { GoHome, GoHomeFill, GoCheckCircleFill } from "react-icons/go";
import { FaTasks } from "react-icons/fa";
import { SettingsIcon, UserIcon } from "lucide-react";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Home",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: FaTasks,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "Members",
    href: "/members",
    icon: UserIcon,
    activeIcon: UserIcon,
  },
];

export const Navigation = () => {
  const workspaceId = useWorkspaceId();
  const pathName = usePathname();

  return (
    <ul className="flex flex-col">
      {routes.map((item) => {
        const fullHref = `/workspaces/${workspaceId}${item.href}`;
        const isActive = pathName === fullHref;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
            <Link key={item.href} href={fullHref}>
              <div
                  className={cn(
                      "flex group text-[poppins] items-center gap-2.5 p-3.5 rounded-full font-medium hover:text-[#169c70] hover:font-bold hover:bg-[#ffffff] transition text-white",
                      isActive ? "bg-white shadow-sm text-[#169c70] font-bold" : ""
                  )}
              >
                <Icon
                    className={cn(
                        "size-5 group-hover:text-[#169c70]",
                        isActive ? "text-[#169c70]" : "text-white"
                    )}
                />
                <span
                    className={cn(
                        "group-hover:text-[#169c70]",
                        isActive ? "text-[#169c70]" : "text-white"
                    )}
                >
    {item.label}
  </span>
              </div>

            </Link>
        );
      })}
    </ul>
  );
};
