import { useFetchUser } from "@/action/userAuth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "./store";

export const ProtectedRoute = () => {
  const { user } = useStore();
  const { fetchUser, loading: fetchingUser } = useFetchUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      await fetchUser(); // Ensure the session is fetched
      setLoading(false); // Stop showing the loading state
    };

    initialize();
  }, [fetchUser]);

  if (fetchingUser || loading) {
    return <div></div>; // Replace with spinner or skeleton UI
  }

  return user.isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};
