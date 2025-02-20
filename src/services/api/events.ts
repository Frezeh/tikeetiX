import { AxiosRequestConfig } from "axios";
import { makeRequest } from "../request";
import { EventBody, EventDetails, Events, EventsData } from "../models/events";

export const createEvent = async (body: EventBody) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "events",
    data: body,
  };

  const response = await makeRequest<Events>(config);

  return response.data;
};

export const getEvents = async (page = 1, limit = 10, params: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `events/user/created?page=${page}&limit=${limit}&${params}`,
  };

  const response = await makeRequest<EventsData>(config);

  return response.data;
};

export const currentUserEventActivities = async (
  page = 1,
  limit = 10,
  params: string
) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `events/current-user-activities?page=${page}&limit=${limit}${params}`,
  };

  const response = await makeRequest<EventsData>(config);

  return response.data;
};

export const getEvent = async (id: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `events/details/${id}`,
  };

  const response = await makeRequest<EventDetails>(config);

  return response.data;
};

export const updateEvent = async ({
  id,
  body,
}: {
  id: string;
  body: Partial<Events>;
}) => {
  const config: AxiosRequestConfig = {
    method: "PATCH",
    url: `events/${id}`,
    data: body,
  };

  const response = await makeRequest<Events>(config);

  return response.data;
};

export const deleteEvent = async (id: string) => {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `events/${id}`,
  };

  const response = await makeRequest<Events>(config);

  return response.data;
};
