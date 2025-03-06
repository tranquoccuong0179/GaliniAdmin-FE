import axios from "axios";
import {
  CreateListenerInfoModel,
  GetListenerResponses,
  ListenerResponse,
  ListenerTypeEnum,
} from "../dtos/typeListener";

const API_URL = "https://harmon.love/api/v1/listener";

export const listener = {
  createListener: async (request: CreateListenerInfoModel) => {
    const { data } = await axios.post<ListenerResponse>(API_URL, request);
    if (data.status !== "200") {
      return {
        status: data.status,
        message: data.message,
        data: data.data,
      };
    }
    return {
      status: data.status,
      message: data.message,
    };
  },

  getListeners: async (params?: {
    name?: string;
    listenerTypeEnum?: ListenerTypeEnum;
    sortByName?: boolean;
    sortByPrice?: boolean;
    sortByStar?: boolean;
  }): Promise<GetListenerResponses> => {
    try {
      const { data } = await axios.get<GetListenerResponses>(API_URL, {
        params,
      });
      return data;
    } catch (error) {
      console.error("Lỗi khi tải danh sách listener:", error);
      throw new Error("Không thể tải danh sách listener.");
    }
  },

  deleteListener: async (id: string) => {
    const { data } = await axios.delete(`${API_URL}/${id}`);
    return data;
  },
};
