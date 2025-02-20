import { AxiosRequestConfig } from "axios";
import { SettlementAccount } from "../models/finance";
import { makeRequest } from "../request";

export const createSettlementAccount = async (body: {
  bankName: string;
  sortCode: string;
  accountNumber: string;
}) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "settlement-accounts",
    data: body,
  };

  const response = await makeRequest(config);

  return response.data;
};

export const getSettlementAccounts = async () => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "settlement-accounts",
  };

  const response = await makeRequest<SettlementAccount[]>(config);

  return response.data;
};

export const getSettlementAccount = async (id: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `settlement-accounts${id}`,
  };

  const response = await makeRequest<SettlementAccount>(config);

  return response.data;
};

export const deleteSettlementAccount = async (id: string) => {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `settlement-accounts${id}`,
  };

  const response = await makeRequest<SettlementAccount>(config);

  return response.data;
};

export const requestPayout = async (body: {
  settlementAccountId: string;
  amount: number;
}) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "settlement-accounts/payout",
    data: body,
  };

  const response = await makeRequest<{ message: string; transferId: number }>(
    config
  );

  return response.data;
};
