import axios from "axios";
import { TransactionResponse } from "../dtos/typeTransaction";

const API_URL = "https://harmon.love/api/v1/transaction/admin";

export const transactionService = {
  getTransactions: async (params?: {
    page?: number;
    size?: number;
    name?: string;
    email?: string;
    phone?: string;
    status?: "SUCCESS" | "PENDING" | "FAILED";
    type?: "DEPOSIT" | "BOOKING" | "PREMIUM";
    sortByPrice?: boolean;
    daysAgo?: number;
    weeksAgo?: number;
    monthsAgo?: number;
  }): Promise<TransactionResponse> => {
    const { data } = await axios.get<TransactionResponse>(API_URL, {
      params,
    });
    return data;
  },
};
