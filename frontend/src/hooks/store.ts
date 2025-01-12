import { create } from "zustand";

type userType = {
  name: string;
  avatar: string;
  email?: string;
};
type Projects = {
		id:string
		createdAt:string
		updatedAt: string
		name:string
		webURL:string
		description:string
	
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
  projects:Projects[] | null ;
  loginSucess: (data: userType) => void;
  logoutUser: () => void;
  fetchAllProject:(data:Projects[]) => void;
};
export const useStore = create<useStoreType>((set) => ({
  user: userInitiate,
  projects:null,
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
  fetchAllProject: (data)=>{
    set(()=>({
      projects:data
    }))
  }
}));
