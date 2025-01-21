"use client";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ChartLine,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: BookCopy,
  },
  {
    title: "Forms",
    url: "/dashboard/forms",
    icon: NotepadText,
  },
  {
    title: "Mail",
    url: "/dashboard/mails",
    icon: Mail,
  },
  {
    title: "Email Services",
    url: "/dashboard/email-services",
    icon: Server,
  },
];

export function AppSidebar() {
  // const location = useLocation();
  const pathname = usePathname();
  console.log(pathname)
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
                      href={item.url}
                      className={cn(
                        pathname === item.url
                          ? `bg-stone-200 text-stone-800`
                          : ""
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
                <Link href={"/dashboard"}>
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
