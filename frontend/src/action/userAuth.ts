import { useStore } from "@/hooks/store";
import { useCallback, useState } from "react";
import { fetcher } from "@/main";

export const useFetchUser = () => {
  const { loginSucess, logoutUser } = useStore();
  const [loading, setLoading] = useState<boolean>(false);
  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetcher.get(
        `/api/auth/getsession`

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
