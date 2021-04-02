import axios, { AxiosRequestConfig } from 'axios';

import { USER_LOCALSTORAGE_KEY } from '../constants';

interface jwtHeader {
  'x-access-token'?: string;
}

export function getJWTHeader(): jwtHeader {
  const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  let token = null;
  if (storedUser) {
    token = JSON.parse(storedUser).token;
  }

  return token ? { 'x-access-token': token } : {};
}

const config: AxiosRequestConfig = { baseURL: 'http://localhost:3030' };
export const axiosInstance = axios.create(config);
