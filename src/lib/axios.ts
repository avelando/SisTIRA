import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from '@/lib/authStorage';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || 'http://127.0.0.1:3001/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

const raw = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const at = getAccessToken();
  if (at) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${at}`;
  }
  return config;
});

let isRefreshing = false;
let pendingQueue: Array<(token: string) => void> = [];

function onRefreshed(newAccess: string) {
  pendingQueue.forEach((cb) => cb(newAccess));
  pendingQueue = [];
}

function shouldBypassRefresh(url = '') {
  return /\/auth\/(login|register|refresh|logout)(\/)?$/.test(url);
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { response, config } = error;
    const original = config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    const status = response?.status;
    const url = original?.url || '';

    if (status === 401 && original && !original._retry && !shouldBypassRefresh(url)) {
      original._retry = true;

      const rt = getRefreshToken();
      if (!rt) {
        clearTokens();
        if (typeof window !== 'undefined') window.location.href = '/auth/login';
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingQueue.push((newAccess) => {
            original.headers = original.headers ?? {};
            (original.headers as any).Authorization = `Bearer ${newAccess}`;
            resolve(api(original));
          });
        });
      }

      isRefreshing = true;
      try {
        const { data } = await raw.post('/auth/refresh', { refreshToken: rt });
        const { accessToken, refreshToken } = data as { accessToken: string; refreshToken: string };
        setTokens(accessToken, refreshToken);
        onRefreshed(accessToken);

        original.headers = original.headers ?? {};
        (original.headers as any).Authorization = `Bearer ${accessToken}`;
        return api(original);
      } catch (e) {
        clearTokens();
        if (typeof window !== 'undefined') window.location.href = '/auth/login';
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
export { raw, API_BASE_URL };
