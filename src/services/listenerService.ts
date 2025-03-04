import axios from "axios";
import {
  CreateListenerInfoModel,
  ListenerResponse,
} from "../dtos/typeListener";

const API_URL = "https://harmon.love/api/v1/listener";

export const listener = {
  createListener: async (request: CreateListenerInfoModel) => {
    const { data } = await axios.post<ListenerResponse>(API_URL, request, {
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
