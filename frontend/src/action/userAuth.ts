import axios from "axios";
import { CONFIG } from "../lib/config";
import { useStore } from "@/hooks/store";
import { useCallback, useState } from "react";

export const useFetchUser = () => {
  const { loginSucess, logoutUser } = useStore();
  const [loading, setLoading] = useState<boolean>(false);
  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${CONFIG.BACKEND_URL}/api/auth/getsession`,
        {
          withCredentials: true, // Ensure cookies are sent with the request
        },
      );
      if (response.data && response.data.user) {
        loginSucess(response.data.user);
      }
    } catch (error) {
      logoutUser();
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  }, [loginSucess, logoutUser]);
  return { loading, fetchUser };
};
