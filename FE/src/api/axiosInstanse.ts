import axios from 'axios';

import { VITE_BASE_URL } from 'env';

export const axiosInstance = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
