import { Outlet } from "react-router-dom";
import { AppSidebar } from "./SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useFetchUser } from "@/action/userAuth";
import { Toaster } from "@/components/ui/toaster";

export default function Dash() {
  const { fetchUser } = useFetchUser();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
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
