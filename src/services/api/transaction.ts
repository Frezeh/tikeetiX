import { AxiosRequestConfig } from "axios";
import { TransactionData } from "../models/transaction";
import { makeRequest } from "../request";

export const getTransactions = async (page = 1, limit = 10, params: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `transaction?page=${page}&limit=${limit}${params}`,
  };

  const response = await makeRequest<TransactionData>(config);

  return response.data;
};
