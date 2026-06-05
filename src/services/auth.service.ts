import api from '../lib/axios';
import { API_ROUTES } from '../constants/routes';
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
} from '../types/auth.types';

/**
 * Inicia sesión con email y password
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Asegúrate de que LoginCredentials en auth.types.ts use 'password'
  const { data } = await api.post<AuthResponse>(API_ROUTES.auth.login, credentials);
  return data;
};

/**
 * Crea una nueva cuenta de usuario
 */
export const register = async (userData: RegisterCredentials): Promise<AuthResponse> => {
  // userData ya debería venir con la estructura { name, email, password }
  const { data } = await api.post<AuthResponse>(API_ROUTES.auth.register, userData);
  return data;
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
  const { data } = await api.get<User>(API_ROUTES.auth.me);
  return data;
};
