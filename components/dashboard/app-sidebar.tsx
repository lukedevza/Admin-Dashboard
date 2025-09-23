import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { logout } from "@/actions/logout";
import { AudioWaveformIcon } from "lucide-react";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Employees",
      url: "#",
      items: [
        {
          title: "All Employees",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Deparments",
      url: "#",
      items: [
        { title: "Warehouse", url: "/dashboard?department=Warehouse" },
        { title: "Sales", url: "/dashboard?department=Sales" },
      ],
    },
    {
      title: "Manage Employees",
      url: "#",
      items: [
        {
          title: "Create",
          url: "/dashboard/create",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 font-medium pt-2 ml-1">
          <div className="bg-foreground text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <AudioWaveformIcon className="size-4 bg-foreground" />
          </div>
          Company Name.
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={logout}
          className="cursor-pointer"
        >
          Logout
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
