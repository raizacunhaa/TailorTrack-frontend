import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from './useAuth';
import { login as loginService } from '../services/auth.service';
import { validateEmail } from '../helpers/email.validator';
import { validatePassword } from '../helpers/password.validator';
import { ROUTES } from '../constants/routes';
import type { LoginError } from '../types/errors.types';

type ApiError = {
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
  };
};

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login: saveAuth } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginError>({});
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState('Iniciar sesión');

  const [showRegisteredMsg, setShowRegisteredMsg] = useState(
    searchParams.get('registered') === 'true',
  );

  const handleInputChange = (
    field: keyof LoginError,
    value: string,
    setter: (v: string) => void,
  ) => {
    setter(value);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (showRegisteredMsg) {
      setShowRegisteredMsg(false);
      searchParams.delete('registered');
      setSearchParams(searchParams);
    }

    const emailRes = validateEmail(email);
    const passRes = validatePassword(password, false);

    const freshErrors: LoginError = {
      email: emailRes.email || undefined,
      password1: passRes.password1 || undefined,
      api: undefined,
    };

    setErrors(freshErrors);

    if (freshErrors.email || freshErrors.password1) {
      return;
    }

    setLoading(true);
    setLoginStatus('Verificando...');

    const startedAt = Date.now();

    try {
      const response = await loginService({ email, password });

      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, 1200 - elapsed);

      setLoginStatus('Iniciando...');

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      saveAuth(response.user);

      navigate(ROUTES.home, {
        state: {
          welcome: true,
        },
      });
    } catch (error: unknown) {
      const apiResponse = error as ApiError;
      const apiError =
        apiResponse.response?.data?.error ||
        apiResponse.response?.data?.message ||
        'Credenciales incorrectas.';
      setErrors({ api: apiError });
      setLoginStatus('Iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    errors,
    loading,
    loginStatus,
    showRegisteredMsg,
    handleInputChange,
    handleLogin,
  };
};
