import { Outlet } from "react-router-dom";
import { AppSidebar } from "./SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useFetchUser } from "@/action/userAuth";
import { Toaster } from "@/components/ui/toaster";
import { useFetchProject } from "@/action/useProjects";

export default function Dash() {
  const { fetchUser } = useFetchUser();
  const {fetchProject} = useFetchProject()
  useEffect(() => {
    fetchUser();
    fetchProject()
  }, [fetchUser,fetchProject]);
  return (
    <div className="w-full h-screen overflow-hidden">
      <SidebarProvider>
        <AppSidebar />

        <Outlet />

        <Toaster />
      </SidebarProvider>
    </div>
  );
}
