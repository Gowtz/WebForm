import { create } from "zustand";

type userType = {
  name: string;
  avatar: string;
  email?: string;
  googleId?: string;
  githubId?: string;
};

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
  loginSucess: (data: userType) => void;
  logoutUser: () => void;
};
export const useStore = create<useStoreType>((set) => ({
  user: userInitiate,
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
}));
