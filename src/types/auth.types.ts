export interface User {
  id: number | string;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  dni?: string;
  roleName?: string;
  roleId?: number;
  role?: 'admin' | 'vendedor' | 'user';
}

/**
 * Representa la respuesta exitosa que devuelve tu backend de Node.js
 */
export interface AuthResponse {
  user: User;
  token?: string;
  message?: string;
  ok?: boolean; // Tu controlador de login devuelve { ok: true }
}

/**
 * Estructura de los datos necesarios para el registro
 */
export interface RegisterCredentials {
  firstName: string; // Requerido por el back
  lastName: string; // Requerido por el back
  dni: string; // Requerido por el back
  email: string;
  password: string;
}

/**
 * Estructura de los datos necesarios para el login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Definición del contexto para el AuthProvider
 */
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}
