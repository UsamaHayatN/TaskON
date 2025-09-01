"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button variant="secondary" className={"lg:hidden"}>
          <MenuIcon className={"size-4 text-red-900 "} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
