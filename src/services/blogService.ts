import axios from "axios";
import { BlogRequest, BlogResponse } from "./../dtos/typeBlog";
const API_URL = "https://harmon.love/api/v1/blog";

export const blog = {
  createBlog: async (request: BlogRequest, token: string) => {
    const { data } = await axios.post<BlogResponse>(API_URL, request, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (data.status !== "200") {
      return {
        message: data.message,
      };
    }
    return {
      message: data.message,
    };
  },
};
