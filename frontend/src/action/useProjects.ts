import { useCallback, useState } from "react";
import { fetcher } from "@/main";
import { useStore } from "@/hooks/store";

export const useFetchProject = () => {
  const { fetchAllProject, toggleProjectActive } = useStore()

  const [loading, setLoading] = useState<boolean>(false);
  const fetchProject = useCallback(async () => {
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
  }, [fetchAllProject]);
  const toggleActive = useCallback(async (id: string, isActive: boolean) => {
    toggleProjectActive(id)

    await fetcher.post('/api/project/toggleisactive', { id, isActive })

  }, [toggleProjectActive])

  const deleteProject= useCallback(async(id:string) => {
     await fetcher.delete(`/api/project/delete/${id}`)
    fetchProject()
  },[fetchProject])
  return { loading, fetchProject, toggleActive ,deleteProject};
};
