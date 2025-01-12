import {
  BookCopy,
  ChartLine,
  Mail,
  NotepadText,
  Server,
  Settings,
} from "lucide-react";

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
import { Link, useLocation } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Projects",
    url: "/dashboard/main",
    icon: BookCopy,
  },
  {
    title: "Forms",
    url: "/dashboard/forms",
    icon: NotepadText,
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
];

export function AppSidebar() {
  const location = useLocation();

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
                    <Link
                      to={item.url}
                      className={cn(
                        location.pathname === item.url
                          ? `bg-stone-200 text-stone-800`
                          : "",
                      )}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="mb-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={"/dashboard"}>
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
