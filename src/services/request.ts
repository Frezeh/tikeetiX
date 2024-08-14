import { getItem } from "@/lib/utils";
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";

export interface ApiResponse<T = any> {
  data: GenericResponse<T>;
  status: number;
}

export interface GenericResponse<T = any> {
  status: number;
  message: string;
  data: T;
}

type ApiError = AxiosError<ApiResponse>;

function createApiClient() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_STAGING_BASE_URL,
    timeout: 10000, // Set your desired timeout
    headers: {
      token: getItem<string>("token"),
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.request.use(
    (config) => {
      const token = getItem<string>("token");

      if (token) {
        config.headers.token = token;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
}

const apiClient = createApiClient();

export async function makeRequest<T = any>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<GenericResponse<T>> = await apiClient(config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const axiosError = error as ApiError;
    if (axiosError.response) {
      throw {
        error: axiosError.response.data.data,
        status: axiosError.response.status,
      };
    } else {
      throw {
        data: "An error occurred while making the request.",
        status: 500,
      };
    }
  }
}
