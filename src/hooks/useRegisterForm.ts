import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerService } from '../services/auth.service';
import { validateEmail } from '../helpers/email.validator';
import { validatePassword } from '../helpers/password.validator';
import { ROUTES } from '../constants/routes';
import type { LoginError } from '../types/errors.types';

type ApiError = {
  response?: {
    data?: {
      details?: string[];
      error?: string;
      message?: string;
    };
  };
};

// 1. Extendemos la interfaz de errores para los nuevos campos
interface RegisterError extends LoginError {
  firstName?: string;
  lastName?: string;
  dni?: string;
}

export const useRegisterForm = () => {
  const navigate = useNavigate();

  // 2. Nuevos estados para cumplir con el backend
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<RegisterError>({});
  const [loading, setLoading] = useState(false);
  const [registerStatus, setRegisterStatus] = useState('Crear cuenta');

  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let strength = 0;
    if (pass.length >= 6) strength += 25;
    if (pass.length >= 10) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) strength += 25;
    return strength;
  };

  const handleInputChange = (
    field: keyof RegisterError,
    value: string,
    setter: (v: string) => void,
  ) => {
    setter(value);
    if (errors[field]) {
      setErrors((prev: RegisterError) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRes = validateEmail(email);
    const passRes = validatePassword(password);

    // 3. Validaciones locales para los nuevos campos obligatorios
    const freshErrors: RegisterError = {
      firstName: !firstName.trim() ? 'El nombre es obligatorio.' : undefined,
      lastName: !lastName.trim() ? 'El apellido es obligatorio.' : undefined,
      dni: !dni.trim() ? 'El DNI es obligatorio.' : undefined,
      email: emailRes.email || undefined,
      password1: passRes.password1 || undefined,
      api: undefined,
    };

    if (!confirmPassword) {
      freshErrors.password2 = 'Por favor, repetí la contraseña.';
    } else if (password !== confirmPassword) {
      freshErrors.password2 = 'Las contraseñas no coinciden.';
    }

    setErrors(freshErrors);

    if (Object.values(freshErrors).some((error) => error !== undefined)) {
      return;
    }

    setLoading(true);
    setRegisterStatus('Creando...');

    const startedAt = Date.now();

    try {
      await registerService({
        firstName,
        lastName,
        dni,
        email,
        password,
      });

      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, 900 - elapsed);

      setRegisterStatus('¡Éxito!');

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      navigate(`${ROUTES.auth.login}?registered=true`);
    } catch (error: unknown) {
      const apiResponse = error as ApiError;
      // Si el backend devuelve un array de errores (como vimos en el curl), los extraemos
      const apiError =
        apiResponse.response?.data?.details?.[0] ||
        apiResponse.response?.data?.error ||
        apiResponse.response?.data?.message ||
        'Error al crear la cuenta.';

      setErrors({ api: apiError });
      setRegisterStatus('Crear cuenta');
    } finally {
      setLoading(false);
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    dni,
    setDni,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
    loading,
    registerStatus,
    strength: getPasswordStrength(password),
    handleInputChange,
    handleRegister,
  };
};
