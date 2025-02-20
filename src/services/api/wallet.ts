import { AxiosRequestConfig } from "axios";
import { makeRequest } from "../request";
import { Wallet } from "../models/wallet";

export const getWallet = async () => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "wallet",
  };

  const response = await makeRequest<Wallet>(config);

  return response.data;
};
