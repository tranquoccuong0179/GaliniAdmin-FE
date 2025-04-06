import axios from "axios";
import {
  GetPremiums,
  PremiumData,
  PremiumRequest,
  PremiumResponse,
} from "../dtos/typePremium";

const API_URL = "https://harmon.love/api/v1/premium";

export const premiumService = {
  getPremiums: async (params?: {
    page?: number;
    size?: number;
    friend?: number;
    timelimit?: boolean;
    match?: number;
    minPrice?: number;
    maxPrice?: number;
    sortByFriend?: boolean;
    sortByMatch?: boolean;
    sortByPrice?: boolean;
    sortByTimelimit?: boolean;
  }): Promise<PremiumResponse<GetPremiums>> => {
    const { data } = await axios.get<PremiumResponse<GetPremiums>>(API_URL, {
      params,
    });
    return data;
  },

  createPremium: async (request: PremiumRequest) => {
    const { data } = await axios.post<PremiumResponse<PremiumData>>(
      API_URL,
      request
    );
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
};
