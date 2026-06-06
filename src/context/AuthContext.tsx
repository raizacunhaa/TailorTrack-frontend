import { useState, useEffect, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import api from '../lib/axios';
import { API_ROUTES } from '../constants/routes';
import type { User } from '../types/auth.types';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const { data } = await api.get<{ data: { user: User } }>(API_ROUTES.auth.me);

        if (data.data.user) {
          setUser(data.data.user);
          setIsAuthenticated(true);
        }
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        // En tu Linux Mint, un pequeño delay en desarrollo ayuda a evitar parpadeos
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const login = useCallback((userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post(API_ROUTES.auth.logout);
    } catch (error) {
      console.error('Error al cerrar sesión en el servidor:', error);
    } finally {
      // Limpiamos siempre, falle o no la petición al servidor
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
    }),
    [user, isAuthenticated, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
