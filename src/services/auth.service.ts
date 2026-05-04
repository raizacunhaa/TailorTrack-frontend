import axios from 'axios';
import { API_ROUTES } from '../constants/routes';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // http://localhost:4000/api
  withCredentials: true,
});

export const login = async (credentials: any) => {
  const { data } = await api.post(API_ROUTES.auth.login, credentials);
  return data;
};
