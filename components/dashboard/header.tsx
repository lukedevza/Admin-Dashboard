"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BadgeCheck, Bell, Settings } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface HeaderProps {
  email: string;
  firstName: string;
  lastName: string;
  userId: string;
}

export default function Header({ firstName, lastName, email, userId }: HeaderProps) {
  return (
    <header className="bg-background sticky top-0 flex flex-row h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 h-4"
      />
      <Breadcrumb className="flex-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link
              href={"/dashboard"}
              className="hover:text-foreground"
            >
              Dashboard
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <Link
              href={`/dashboard/${userId}`}
              className="hover:text-foreground"
            >
              {firstName} {lastName}
            </Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 rounded-full cursor-pointer">
            <AvatarImage
              src={""}
              alt={firstName}
            />
            <AvatarFallback className="rounded-full">
              {firstName.charAt(0)}
              {lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg mr-3"
          side={"bottom"}
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex flex-col items-start gap-1 px-2 py-1.5 text-sm">
              <span className="truncate text-sm font-semibold">{firstName}</span>
              <span className="truncate text-xs">{email}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/${userId}`}>
                <BadgeCheck />
                Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <Button className="w-full mt-1">Logout</Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
