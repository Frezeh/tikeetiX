import { AxiosRequestConfig } from "axios";
import { makeRequest } from "../request";

export const uploadSingleFile = async (body: FormData) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "files",
    data: body,
  };

  const response = await makeRequest<string>(config);

  return response.data;
};
