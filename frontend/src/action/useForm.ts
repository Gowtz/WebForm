import { useCallback, useState } from "react";
import { fetcher } from "@/main";
import { useStore } from "@/hooks/store";

export const useFetchForm = () => {
  const { fetchAllForm,toggleFormActive } = useStore()
  const [loading, setLoading] = useState<boolean>(false);
  const fetchForm= useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetcher.get(
        `/api/form/getall`
      );
      if (response.data) {
        fetchAllForm(response.data)
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchAllForm]);
  const toggleActiveForm= useCallback(async(id:string,isActive:boolean) => {
    toggleFormActive(id)
     await fetcher.post('/api/form/toggleisactive',{id,isActive:!isActive})
  },[toggleFormActive])

  const deleteForm= useCallback(async(id:string) => {
     await fetcher.delete(`/api/form/delete/${id}`)
    fetchForm()
  },[fetchForm])
  return { loading, fetchForm, toggleActiveForm,deleteForm};
};
