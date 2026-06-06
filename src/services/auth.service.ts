import api from '../lib/axios';
import { API_ROUTES } from '../constants/routes';
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
} from '../types/auth.types';

type ApiResponse<T> = {
  ok: boolean;
  data: T;
};

/**
 * Inicia sesión con email y password
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // 1. Atrapamos la respuesta
  const { data } = await api.post<ApiResponse<{ ok: boolean; token: string }>>(
    API_ROUTES.auth.login,
    credentials,
  );

  // 2. Extraemos el token
  const token = data.data.token;

  // 3. Lo guardamos (opcional, pero recomendado para persistencia)
  localStorage.setItem('token', token);

  // 4. Se lo inyectamos a Axios para que la siguiente petición (/me) lo lleve en el header
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  // 5. Ahora sí, pedimos el usuario. El token ya viaja en el header.
  const user = await getCurrentUser();
  return { user, ok: true };
};

/**
 * Crea una nueva cuenta de usuario
 */
export const register = async (userData: RegisterCredentials): Promise<AuthResponse> => {
  const { data } = await api.post<ApiResponse<User>>(API_ROUTES.auth.register, userData);
  return { user: data.data, ok: data.ok };
};

export const recoverPassword = async (email: string): Promise<void> => {
  await api.post(API_ROUTES.auth.recover, { email: email.trim().toLowerCase() });
};

export const verifyResetToken = async (token: string): Promise<void> => {
  await api.get(`${API_ROUTES.auth.reset}/${token}`);
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  await api.post(API_ROUTES.auth.reset, { token, newPassword });
};

/**
 * Cierra la sesión del usuario
 */
export const logout = async (): Promise<void> => {
  await api.post(API_ROUTES.auth.logout);
};

/**
 * Obtiene la información del usuario autenticado (persistencia)
 */
export const getCurrentUser = async (): Promise<User> => {
  const { data } = await api.get<ApiResponse<{ user: User }>>(API_ROUTES.auth.me);
  return data.data.user;
};
