// services/dashboardService.ts
import axios from "axios";
import { Dashboard, DashboardResponse } from "../dtos/typeDashboard";

const API_URL = "https://harmon.love/api/v1/dashboard";

export const dashboardService = {
  getDashboard: async (): Promise<DashboardResponse<Dashboard>> => {
    try {
      const { data } = await axios.get<DashboardResponse<Dashboard>>(API_URL);

      if (data.status === "200") {
        return data;
      } else {
        console.error("Lỗi khi lấy dữ liệu dashboard:", data.message);
        return {
          status: "500",
          message: data.message || "Không thể lấy dữ liệu dashboard.",
          data: {
            totalListeners: 0,
            totalUsers: 0,
            totalBlogs: 0,
            totalTransaction: 0,
            chart: {
              labels: [],
              values: [],
            },
          },
        };
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu dashboard:", error);
      return {
        status: "500",
        message: "Lỗi server. Không thể lấy dữ liệu dashboard.",
        data: {
          totalListeners: 0,
          totalUsers: 0,
          totalBlogs: 0,
          totalTransaction: 0,
          chart: {
            labels: [],
            values: [],
          },
        },
      };
    }
  },
};
