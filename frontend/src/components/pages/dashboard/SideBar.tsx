import { BookCopy, ChartLine, Mail, Server, Settings } from "lucide-react";

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
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { useStore } from "@/hooks/store";

// Menu items.
const items = [
  {
    title: "Projects",
    url: "/dashboard/main",
    icon: BookCopy,
  },
  {
    title: "Mail",
    url: "/dashboard/mail",
    icon: Mail,
  },
  {
    title: "Email Services",
    url: "/dashboard/email-services",
    icon: Server,
  },
  {
    title: "Statics",
    url: "/dashboard/statics",
    icon: ChartLine,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { user } = useStore((state) => state.user);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <h1 className="text-2xl font-semibold text-center mt-5">Web Form</h1>
        </SidebarHeader>
        <SidebarGroup className="h-full">
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={cn(
                        location.pathname === item.url
                          ? `bg-stone-200 text-primary `
                          : "",
                      )}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <div className="flex gap-2 justify-start items-center mt-auto mb-5 ml-5">
            <img
              src={user?.avatar}
              alt="Profile"
              width="30"
              className="rounded-full"
            />
            <span>{user?.name}</span>
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
