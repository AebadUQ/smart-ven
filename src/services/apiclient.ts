// services/apiClient.ts
import axios from 'axios';
import { Jobportal_BASE_URL } from '@/types/apiConstants';

export const REQUEST_HEADER_AUTH_KEY = 'Authorization';
export const TOKEN_TYPE = 'Bearer ';

const apiClient = axios.create({
  timeout: 60000,
  baseURL: Jobportal_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// before each request, grab the token and set the header
apiClient.interceptors.request.use((config) => {
  // get your raw token string
  const token = localStorage.getItem('custom-auth-token');
  if (token && config.headers) {
    config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${token}`;
  }
  return config;
});

export default apiClient;
