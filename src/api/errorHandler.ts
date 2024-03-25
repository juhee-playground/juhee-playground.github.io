import { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

// https://dev.to/vikirobles/how-to-create-an-auth-login-system-with-axios-interceptors-typescript-2k11
interface ResponseData {
  data?: string;
}

const logOnDev = (message: string) => {
  if (process.env.NODE_ENV === "development") {
    console.log(message);
  }
};

function handleError(serverError: ResponseData) {
  if (serverError?.data) {
    console.log("handleError", serverError);
  }
}

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const { method, url } = config;
  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);
  return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config;
  const { status } = response;
  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`);
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  handleError(error?.response as ResponseData);
  return Promise.reject(error);
};

export default function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
}
