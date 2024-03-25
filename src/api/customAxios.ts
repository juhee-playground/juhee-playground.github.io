import axios, { AxiosInstance } from "axios";

import setupInterceptorsTo from "./errorHandler";

const SERVER_ADDRESS = process.env.REACT_APP_BACK_END_POINT;

const customAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`, // 기본 서버 주소 입력
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptorsTo(customAxios);

export default customAxios;
