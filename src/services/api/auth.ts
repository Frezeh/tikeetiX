import { AxiosRequestConfig } from "axios";
import { LoginBody, User } from "../models/auth";
import { makeRequest } from "../request";

export const login = async (body: LoginBody) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "auth/login",
    data: body,
  };

  const response = await makeRequest<User>(config);

  return response.data;
};

export const completeLogin = async (body: { email: string; code: string }) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "auth/complete-login",
    data: body,
  };

  const response = await makeRequest<{
    user: User;
    accessToken: string;
    refreshToken: string;
  }>(config);

  return response.data;
};

export const register = async (body: {
  email: string;
  password: string;
  country: string;
  firstName: string;
  lastName: string;
  accountType: "Individual" | "Organization";
  businessName?: string;
  type: "User" | "Business";
}) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "auth/register",
    data: body,
  };

  const response = await makeRequest<User>(config);

  return response.data;
};

export const sendEmailOtp = async (body: { email: string }) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "auth/send-email-otp",
    data: body,
  };

  const response = await makeRequest(config);

  return response.data;
};

export const verifyEmail = async (body: { email: string; code: string }) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "auth/verify-email",
    data: body,
  };

  const response = await makeRequest<{user: User, accessToken: string}>(config);

  return response.data;
};

export const forgotPassword = async (body: { email: string }) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "auth/forgot-password",
    data: body,
  };

  const response = await makeRequest<{ message: string }>(config);

  return response.data;
};
export const resetPassword = async (body: {
  email: string;
  password: string;
}) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "auth/reset-password",
    data: body,
  };

  const response = await makeRequest<{ message: string }>(config);

  return response.data;
};

export const verifyOtp = async (body: { email: string; code: string }) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "auth/verify-otp",
    data: body,
  };

  const response = await makeRequest<{ message: string }>(config);

  return response.data;
};

export const getRefreshToken = async (token: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "auth/refresh-token",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await makeRequest<{
    accessToken: string;
    refreshToken: string;
  }>(config);

  return response.data;
};

export const logout = async () => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "auth/logout",
  };

  const response = await makeRequest<{ message: string }>(config);

  return response.data;
};
