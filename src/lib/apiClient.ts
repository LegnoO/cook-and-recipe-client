// ** Library Imports
import axios, { AxiosError } from "axios";

// ** Services
import { refreshUser } from "@/services/authService";

// ** Config
import { DATABASE_URL } from "@/config/environment";
import { STATUS_CODES } from "@/config/status-codes";

// ** Utils
import { getCookieValue } from "./utils/cookies";

const BASE_URL = DATABASE_URL;

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getCookieValue("access_token")!;


    if (accessToken && config.headers && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const responseUrl = error.response?.config?.url;
    const urls = [
      "/auth/refresh",
      "/users/owned/info",
      "/auth/logout",
      "/auth/public/login",
    ];

    if (
      error.config &&
      error.response &&
      error.response.status === STATUS_CODES.UNAUTHORIZED &&
      !urls.includes(responseUrl!)
    ) {
      const rememberMe: boolean = localStorage.getItem("rememberMe")
        ? JSON.parse(localStorage.getItem("rememberMe")!)
        : false;
      const newToken = await refreshUser(rememberMe);
      error.config.headers.Authorization = `Bearer ${newToken}`;
      return axios.request(error.config);
    }

    return Promise.reject(error);
  },
);

export default AxiosInstance;
