import { Outlet } from "react-router-dom";
import { AppSidebar } from "./SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "@/action/fetchUser";
// import { RootState } from "@/redux/store";
export default function Dash() {
  const dispatch = useDispatch();
  // const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchUser()); // Fetch user details on app load
  }, [dispatch]);
  return (
    <div className="w-full h-screen overflow-hidden">
      <SidebarProvider>
        <AppSidebar />

        <Outlet />
      </SidebarProvider>
    </div>
  );
}
