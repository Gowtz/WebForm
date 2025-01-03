import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type userType = { name: string; email?: string; avatar: string } | null;

interface AuthState {
  isAuthenticated: boolean;
  user: userType;
}
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: "userInfo",
  reducers: {
    loginSuccess(state, action: PayloadAction<userType>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
