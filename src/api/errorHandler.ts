import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// https://dev.to/vikirobles/how-to-create-an-auth-login-system-with-axios-interceptors-typescript-2k11
interface ResponseData {
  data?: string;
}

function handleError(serverError: ResponseData) {
  if (serverError?.data) {
    if (serverError?.data == '토큰 만료') {
      console.error('err');
    }
  }
}

const onRequest = (config: AxiosRequestConfig): any => {
  return config;
};

const onResponseSuccess = (response: AxiosResponse) => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  handleError(error?.response as ResponseData);
  return Promise.reject(error);
};

export default function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, undefined);

  axiosInstance.interceptors.response.use(onResponseSuccess, onResponseError);

  return axiosInstance;
}
