import { create } from "zustand";

type userType = {
  name: string;
  avatar: string;
  email?: string;
};
type Projects = {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  webURL: string
  description: string
  isActive: boolean
}

type Forms = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  isActive: boolean
  projectId: string
  formSchema: string
}

export type AuthStateType = {
  isAuthenticated: boolean;
  user: userType | null;
};

const userInitiate: AuthStateType = {
  isAuthenticated: false,
  user: null,
};

type useStoreType = {
  user: AuthStateType;
  projects: Projects[]
  forms: Forms[]
  loginSucess: (data: userType) => void;
  logoutUser: () => void;
  fetchAllProject: (data: Projects[]) => void;
  fetchAllForm: (data: Forms[]) => void;
  toggleProjectActive: (id: string) => void;
  toggleFormActive: (id: string) => void;
};

export const useStore = create<useStoreType>((set) => ({
  user: userInitiate,
  projects: [],
  forms: [],
  loginSucess: (data) =>
    set(() => ({
      user: {
        isAuthenticated: true,
        user: data,
      },
    })),
  logoutUser: () =>
    set(() => ({
      user: userInitiate,
    })),
  fetchAllProject: (data) =>
    set(() => ({
      projects: data
    })),
  fetchAllForm: (data) =>
    set(() => ({
      forms: data
    })),

  toggleProjectActive: (id: string) => set((state) => {
    const newP = state.projects?.map(project => project.id === id ? { ...project, isActive: !project.isActive } : project)
    return { projects: newP }
  }),

  toggleFormActive: (id: string) => set((state) => {
    const newform = state.forms?.map(form => form.id === id ? { ...form, isActive: !form.isActive } : form)
    return { forms: newform }
  })


}));
