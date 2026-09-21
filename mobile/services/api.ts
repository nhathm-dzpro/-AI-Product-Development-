import axios from 'axios';
import { API_URL } from '../constants';

let authToken: string | null = null;

export function setAuthToken(token: string | null): void {
  authToken = token;
}

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (authToken) config.headers.Authorization = `Bearer ${authToken}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error?.response?.data?.message ?? error?.message ?? 'Request failed';
    return Promise.reject(new Error(message));
  }
);
