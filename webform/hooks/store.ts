import { getAllForms } from '@/action/forms';
import { getAllProject } from '@/action/projects';
import { Forms, Projects } from '@/lib/types';
import { create } from 'zustand'
type Store = {
  projects: Projects[] | null
  forms: Forms[] | null
  fetchForms: () => void
  fetchProjects: () => void
};
export const useStore = create<Store>((set) => ({
  projects: null,
  forms: null,
  fetchForms: async () => {
    const {data:forms} = await getAllForms()
    if(forms){
      set({forms})
    }
  },
  fetchProjects: async () => {
    const projects = await getAllProject()
    set({ projects })
  },

}))
