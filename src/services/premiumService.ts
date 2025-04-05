import axios from "axios";
import { GetPremiums, PremiumResponse } from "../dtos/typePremium";

const API_URL = "https://harmon.love/api/v1/premium";

export const premium = {
  getBlogs: async (params?: {
    page?: number;
    size?: number;
    friend?: number;
    timelimit: boolean;
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
};
