import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

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
  });

  instance.interceptors.request.use((config) => {
    const token = Cookies.get("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = Cookies.get("refreshToken");

        const response = await axios.get(
          `${import.meta.env.VITE_STAGING_BASE_URL}auth/refresh-token`,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        if (response.status === 200) {
          const newToken = response.data.data.accessToken;
          Cookies.set("accessToken", newToken);
          Cookies.set("refreshToken", response.data.data.refreshToken);

          // Update the Authorization header for the failed request and retry it
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

          return apiClient(originalRequest);
        }
      }

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
        error: axiosError.response.data,
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
