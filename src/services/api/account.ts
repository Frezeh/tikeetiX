import { AxiosRequestConfig } from "axios";
import { User } from "../models/auth";
import { makeRequest } from "../request";

export const getProfileDetails = async () => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "account",
  };

  const response = await makeRequest<User>(config);

  return response.data;
};

export const updateProfileDetails = async (body: Partial<User>) => {
  const config: AxiosRequestConfig = {
    method: "PATCH",
    url: "account",
    data: body,
  };

  const response = await makeRequest<User>(config);

  return response.data;
};
