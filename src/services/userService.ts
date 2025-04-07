import axios from "axios";
import { GetUsers, UserResponse } from "../dtos/typeUser";

const API_URL = "https://harmon.love/api/v1/user";

export const user = {
  getUsers: async (params?: {
    page?: number;
    size?: number;
  }): Promise<UserResponse<GetUsers>> => {
    try {
      const { data } = await axios.get<UserResponse<GetUsers>>(API_URL, {
        params,
      });

      if (data.status === "200") {
        return data;
      } else {
        console.error("Lỗi khi lấy dữ liệu blog:", data.message);
        return {
          status: "500",
          message: data.message || "Không thể lấy dữ liệu blog.",
          data: {
            size: 0,
            page: 1,
            total: 0,
            totalPages: 0,
            items: [],
          },
        };
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu blog:", error);
      return {
        status: "500",
        message: "Lỗi server. Không thể lấy dữ liệu blog.",
        data: {
          size: 0,
          page: 1,
          total: 0,
          totalPages: 0,
          items: [],
        },
      };
    }
  },
  deleteUser: async (id: string) => {
    const { data } = await axios.delete(`${API_URL}/${id}`);
    return data;
  },
};
