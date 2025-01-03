import axios from "axios";
import { loginSuccess } from "../redux/userSlice";
import { AppDispatch } from "../redux/store";
import { CONFIG } from "@/lib/config";

export const fetchUser = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(
      `${CONFIG.BACKEND_URL}/api/auth/getsession`,
    );
    if (response.data) {
      dispatch(loginSuccess(response.data.user));
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
};
