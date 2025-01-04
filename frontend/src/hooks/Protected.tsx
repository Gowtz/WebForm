import { useFetchUser } from "@/lib/userAuth";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "./store";
export const ProtectedRoute = () => {
  const { user } = useStore();
  const { fetchUser } = useFetchUser();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return user ? <Outlet /> : <Navigate to="/auth" />;
};
