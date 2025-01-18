"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { usePathname } from "next/navigation";
import { ModeToggle } from "./theme-toggle-btn";

function DashboardNavbar() {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter(Boolean);

  return (
    <div className="h-full w-full flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          {pathnames &&
            pathnames.map((path, index) => (
              <BreadcrumbItem key={index}>
                {index < pathnames.length - 1 && (
                  <BreadcrumbLink href={`/${path}`} className="capitalize">
                    {path}
                  </BreadcrumbLink>
                )}
                {index === pathnames.length - 1 && (
                  <BreadcrumbPage className="capitalize">{path}</BreadcrumbPage>
                )}
                {index < pathnames.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="h-full flex items-center gap-8">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="eng">English</SelectItem>
            <SelectItem value="sin">Sinhala</SelectItem>
            <SelectItem value="tam">Tamil</SelectItem>
          </SelectContent>
        </Select>
        <ModeToggle />

        {/* <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </div>
  );
}

export default DashboardNavbar;
