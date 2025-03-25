import { AxiosRequestConfig } from "axios";
import { makeRequest } from "../request";

export const reportOverview = async () => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "report/overview",
  };

  const response = await makeRequest(config);

  return response.data;
};

export const reportOrdersBreakdown = async (ownerId: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `report/orders-breakdown/${ownerId}`,
  };

  const response = await makeRequest(config);

  return response.data;
};

export const reportTicketSales = async (ownerId: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `report/ticket-sales/${ownerId}`,
  };

  const response = await makeRequest(config);

  return response.data;
};

export const reportRefundsCancellations = async (ownerId: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `report/refunds-cancellations/${ownerId}`,
  };

  const response = await makeRequest(config);

  return response.data;
};

export const reportSalesTrend = async (ownerId: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `report/sales-trend/${ownerId}`,
  };

  const response = await makeRequest(config);

  return response.data;
};