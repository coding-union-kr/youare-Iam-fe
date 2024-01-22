import axios, {
  InternalAxiosRequestConfig,
  type AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from 'axios';
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
  setAuthHeader,
} from './token';
import { ErrorResponse } from '@/types/api';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 15000,
});

const interceptorRequestFulfilled = (config: InternalAxiosRequestConfig) => {
  if (typeof window === 'undefined') return config;

  const accessToken = getAccessToken();
  if (!config.headers) return config;
  if (!accessToken) return config;

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

instance.interceptors.request.use(interceptorRequestFulfilled);

const interceptorResponseFulfilled = (res: AxiosResponse) => {
  if (200 <= res.status && res.status < 300) {
    return res;
  }

  return Promise.reject(res);
};

const interceptorResponseRejected = async (error: AxiosError) => {
  const originalRequest = error.config;
  if (error.response?.status === 401 && originalRequest) {
    const { code } = error.response.data as ErrorResponse;

    // code : AU001 : 토큰 삭제->  로그인 페이지로 이동
    if (code === 'AU001') {
      removeAccessToken();
      window.location.href = '/login';
    }

    // code : AU002 - 액세스 토큰 재발급 -> 토큰 다시 저장, 헤더에 토큰 설정 -> 요청 재시도
    if (code === 'AU002') {
      console.log(code);
      try {
        const res = await instance.post('api/v1/members/auth/token');
        const accessToken = res.headers['authorization'].split(' ')[1];

        setAccessToken(accessToken);
        setAuthHeader(instance, accessToken);

        // 기존 요청 재시도
        return instance(originalRequest);
      } catch (error) {
        // Todo: refresh 만료에 대한 처리
        console.log(error);
      }
    }

    return Promise.reject(error.response.data as ErrorResponse);
  }
  return Promise.reject(error.response?.data as ErrorResponse);
};

instance.interceptors.response.use(
  interceptorResponseFulfilled,
  interceptorResponseRejected
);

export const get = <T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig
) => {
  return instance.get<T, R>(url, config);
};

export const post = <T = any, D = any, R = AxiosResponse<T>>(
  url: string,
  data?: D
) => {
  return instance.post<T, R>(url, data);
};
