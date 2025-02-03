"use client";
import {
  BookCopy,
  ChartLine,
  Mail,
  NotepadText,
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
import { useSession } from "next-auth/react";
import { NavUser } from "./SidebarUser";
import Image from "next/image";
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
  // {
  //   title: "Email Services",
  //   url: "/dashboard/email-services",
  //   icon: Server,
  // },
];

export function AppSidebar() {
  // const location = useLocation();
  const { data: session } = useSession()
  const user = {
    name: session?.user?.name as string,
    email: session?.user?.email as string,
    image: session?.user?.image as string
  }
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary ">

            <Image src={'/Icon.png'} width={42} height={42} alt="Webform logo" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              Webform
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
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
          {
            session?.user &&

            <NavUser user={user} />
          }
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
