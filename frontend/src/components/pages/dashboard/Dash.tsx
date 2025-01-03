import { Outlet } from "react-router-dom";
import { AppSidebar } from "./SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
export default function Dash() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <SidebarProvider>
        <AppSidebar />

        <Outlet />
      </SidebarProvider>
    </div>
  );
}
