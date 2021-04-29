import axios, { AxiosRequestConfig } from 'axios';

import { getStoredUser } from '../user-storage';
import { baseUrl } from './constants';

interface jwtHeader {
  Authorization?: string;
}

export function getJWTHeader(): jwtHeader {
  const storedUser = getStoredUser();

  return storedUser?.token
    ? { Authorization: `Bearer ${storedUser?.token}` }
    : {};
}

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);
