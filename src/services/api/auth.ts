import { AxiosRequestConfig } from "axios";
import { LoginBody, LoginResponse } from "../models/auth";
import { makeRequest } from "../request";

export const login = async (body: LoginBody) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "auth/login",
    data: body,
  };

  const response = await makeRequest<LoginResponse>(config);

  return response.data;
};