import { useCallback, useState } from "react";
import { fetcher } from "@/main";
import { useStore } from "@/hooks/store";

export const useFetchProject = () => {
  const { fetchAllProject } = useStore()
  const [loading, setLoading] = useState<boolean>(false);
  const  fetchProject= useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetcher.get(
        `/api/project/getall`
      );
      if (response.data) {
        fetchAllProject(response.data)
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  }, [ fetchAllProject]);
  return { loading, fetchProject};
};
