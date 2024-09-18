import { AxiosRequestConfig } from "axios";
import { makeRequest } from "../request";
import { Movie, MovieBody, MovieData } from "../models/movies";

export const createMovie = async (body: MovieBody) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "movies/movie",
    data: body,
  };

  const response = await makeRequest<Movie>(config);

  return response.data;
};

export const allMovieActivities = async (
  page = 1,
  limit = 10,
  params: string
) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `movies/all-activities?page=${page}&limit=${limit}${params}`,
  };

  const response = await makeRequest<MovieData>(config);

  return response.data;
};

export const currentUserMovieActivities = async (params: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `movies/current-user-activities${params}`,
  };

  const response = await makeRequest(config);

  return response.data;
};

export const getMovie = async (id: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `movies/${id}`,
  };

  const response = await makeRequest<Movie>(config);

  return response.data;
};

export const updateMovie = async ({
  id,
  body,
}: {
  id: string;
  body: Partial<Movie>;
}) => {
  const config: AxiosRequestConfig = {
    method: "PATCH",
    url: `movies/${id}`,
    data: body,
  };

  const response = await makeRequest<Movie>(config);

  return response.data;
};

export const deleteMovie = async (id: string) => {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `movies/${id}`,
  };

  const response = await makeRequest<Movie>(config);

  return response.data;
};
