import axios from "axios";
import { AuthData, AuthResponse } from "../dtos/typeAuth";

const API_URL = "https://localhost:7183/api/v1/auth";

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
      return {
        success: false,
        message: data.message || "Invalid credentials!",
      };
    }

    const user = data.data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", user.token);

    return { success: true, user };
  } catch (error: any) {
    console.error("Error logging in:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Login failed!",
    };
  }
};
