import axios from "axios";
import { logoutSuccess } from "../redux/userSlice";
import { AppDispatch } from "../redux/store";
import { CONFIG } from "@/lib/config";

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await axios.get(`${CONFIG.BACKEND_URL}/api/auth/logout`); // Endpoint to log out user
    dispatch(logoutSuccess());
  } catch (error) {
    console.error("Failed to logout:", error);
  }
};
