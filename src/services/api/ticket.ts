import { AxiosRequestConfig } from "axios";
import {
  EventTicketBody,
  EventTicketBodyPayload,
  MovieEvent,
  MovieEventData,
  MovieEvents,
  MovieTicketBody,
  MovieTicketBodyPayload,
  TicketEvent,
  TicketEventData,
  TicketEvents,
  TicketResponse,
} from "../models/ticket";
import { makeRequest } from "../request";

export const createEventTicket = async (body: EventTicketBody) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "ticket",
    data: body,
  };

  const response = await makeRequest<TicketResponse[]>(config);

  return response.data;
};

export const createMovieTicket = async (body: MovieTicketBody) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "ticket",
    data: body,
  };

  const response = await makeRequest<TicketResponse[]>(config);

  return response.data;
};

export const getEventTickets = async (page = 1, limit = 10, params: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `ticket?ticketType=Events&page=${page}&limit=${limit}${params}`,
  };

  const response = await makeRequest<TicketEventData>(config);

  return response.data;
};

export const getEventTicketsWithoutParams = async () => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "ticket?ticketType=Events",
  };

  const response = await makeRequest<TicketEventData>(config);

  return response.data;
};

export const getEventTicket = async (id: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `ticket/${id}`,
  };

  const response = await makeRequest<TicketEvents>(config);

  return response.data;
};

export const getMovieTickets = async (page = 1, limit = 10, params: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `ticket?ticketType=Movies&page=${page}&limit=${limit}${params}`,
  };

  const response = await makeRequest<MovieEventData>(config);

  return response.data;
};

export const getMovieTicket = async (id: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `ticket/${id}`,
  };

  const response = await makeRequest<MovieEvents>(config);

  return response.data;
};

export const updateEventTicket = async ({
  id,
  body,
}: {
  id: string;
  body: Partial<EventTicketBodyPayload>;
}) => {
  const config: AxiosRequestConfig = {
    method: "PATCH",
    url: `ticket/${id}`,
    data: body,
  };

  const response = await makeRequest<TicketEvents>(config);

  return response.data;
};

export const updateEventDetails = async ({
  id,
  body,
}: {
  id: string;
  body: {
    isMovie: boolean;
    event: Partial<TicketEvent>;
  };
}) => {
  const config: AxiosRequestConfig = {
    method: "PATCH",
    url: `ticket/main/${id}`,
    data: body,
  };

  const response = await makeRequest<TicketEvents>(config);

  return response.data;
};

export const deleteEventTicket = async (id: string) => {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `ticket/${id}`,
  };

  const response = await makeRequest<TicketEvents>(config);

  return response.data;
};

export const updateMovieTicket = async ({
  id,
  body,
}: {
  id: string;
  body: Partial<MovieTicketBodyPayload>;
}) => {
  const config: AxiosRequestConfig = {
    method: "PATCH",
    url: `ticket/${id}`,
    data: body,
  };

  const response = await makeRequest<MovieEvents>(config);

  return response.data;
};

export const updateMovieDetails = async ({
  id,
  body,
}: {
  id: string;
  body: {
    isMovie: boolean;
    movie: Partial<MovieEvent>;
  };
}) => {
  const config: AxiosRequestConfig = {
    method: "PATCH",
    url: `ticket/main/${id}`,
    data: body,
  };

  const response = await makeRequest<MovieEvents>(config);

  return response.data;
};

export const deleteMovieTicket = async (id: string) => {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `ticket/${id}`,
  };

  const response = await makeRequest<MovieEvents>(config);

  return response.data;
};
