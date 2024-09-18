import { AxiosRequestConfig } from "axios";
import { MovieRoom, MovieRoomResponse } from "../models/movies";
import { makeRequest } from "../request";

export const getMovieRooms = async () => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "movie-room",
  };

  const response = await makeRequest<MovieRoomResponse[]>(config);

  return response.data;
};

export const getMovieRoom = async (id: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `movie-room/${id}`,
  };

  const response = await makeRequest<MovieRoom>(config);

  return response.data;
};

export const createMovieRoom = async (body: MovieRoom) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "movie-room",
    data: body,
  };

  const response = await makeRequest<MovieRoom>(config);

  return response.data;
};

export const updateMovieRoom = async ({
  id,
  body,
}: {
  id: string;
  body: Partial<MovieRoom>;
}) => {
  const config: AxiosRequestConfig = {
    method: "PATCH",
    url: `movie-room/${id}`,
    data: body,
  };

  const response = await makeRequest<MovieRoom>(config);

  return response.data;
};

export const deleteMovieRoom = async (id: string) => {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `movie-room/${id}`,
  };

  const response = await makeRequest<MovieRoom>(config);

  return response.data;
};
