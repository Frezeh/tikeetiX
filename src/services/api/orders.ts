import { AxiosRequestConfig } from "axios";
import {
  ActivityType,
  BookedOrderData,
  OrderStatus,
  SalesReport,
  YearlyReport,
} from "../models/orders";
import { makeRequest } from "../request";

export const getOrders = async (page = 1, limit = 10, params?: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `order/booked?page=${page}&limit=${limit}${params}`,
  };

  const response = await makeRequest<BookedOrderData>(config);

  return response.data;
};

export const getSalesReport = async (params?: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `order/sales-reports${params}`,
  };

  const response = await makeRequest<SalesReport>(config);

  return response.data;
};

export const getYearlyReport = async (
  year: number,
  status: OrderStatus,
  activityType: ActivityType
) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `order/yearly-reports?year=${year}&status=${status}&activityType=${activityType}`,
  };

  const response = await makeRequest<YearlyReport[]>(config);

  return response.data;
};
