import axios from "axios";
import { AuthData, AuthResponse } from "../dtos/typeAuth";

const API_URL = "https://harmon.love/api/v1/auth";

export const login = async (
  username: string,
  password: string
): Promise<{ success: boolean; user?: AuthData; message?: string }> => {
  try {
    const { data } = await axios.post<AuthResponse>(API_URL, {
      username,
      password,
    });

    if (data.status !== "200") {
      console.log(data.message);
      return {
        success: false,
        message: data.message || "Invalid credentials!",
      };
    }

    const user = data.data;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", user.token);
    console.log(data.message);

    return { success: true, user };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error logging in:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed!",
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        success: false,
        message: "An unexpected error occurred!",
      };
    }
  }
};
