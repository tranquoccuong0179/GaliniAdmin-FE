import axios from "axios";
import {
  BlogData,
  BlogRequest,
  BlogResponse,
  GetBlogs,
} from "./../dtos/typeBlog";
const API_URL = "https://harmon.love/api/v1/blog";

export const blog = {
  createBlog: async (request: BlogRequest, token: string) => {
    const { data } = await axios.post<BlogResponse<BlogData>>(
      API_URL,
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (data.status !== "200") {
      return {
        message: data.message,
      };
    }
    return {
      message: data.message,
    };
  },

  getBlogs: async (): Promise<BlogResponse<GetBlogs>> => {
    try {
      const { data } = await axios.get<BlogResponse<GetBlogs>>(API_URL);

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

  getBlog: async (id: string): Promise<BlogResponse<BlogData>> => {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
  },

  likeBlog: async (id: string): Promise<BlogResponse<BlogData>> => {
    const { data } = await axios.get(`${API_URL}/${id}/like`);
    return data;
  },
};
