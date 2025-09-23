"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";

import { useSession } from "next-auth/react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import Header from "@/components/dashboard/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-full h-full">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header
          email={session.user.email!}
          firstName={session.user.firstName}
          lastName={session.user.lastName}
          userId={session.user.id!}
        />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
