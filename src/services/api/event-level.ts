import { AxiosRequestConfig } from "axios";
import { makeRequest } from "../request";
import { TEventLevel, TEventLevelBody } from "../models/events";

export const getAllEventLevel = async () => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "event-level",
  };

  const response = await makeRequest<TEventLevel[]>(config);

  return response.data;
};

export const getEventLevel = async (id: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `event-level/${id}`,
  };

  const response = await makeRequest<TEventLevel>(config);

  return response.data;
};

export const createEventLevel = async (body: TEventLevelBody) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "event-level",
    data: body,
  };

  const response = await makeRequest<TEventLevel>(config);

  return response.data;
};

export const updateEventLevel = async ({
  id,
  body,
}: {
  id: string;
  body: Partial<TEventLevel>;
}) => {
  const config: AxiosRequestConfig = {
    method: "PATCH",
    url: `event-level/${id}`,
    data: body,
  };

  const response = await makeRequest<TEventLevel>(config);

  return response.data;
};

export const deleteEventLevel = async (id: string) => {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `event-level/${id}`,
  };

  const response = await makeRequest<TEventLevel>(config);

  return response.data;
};
