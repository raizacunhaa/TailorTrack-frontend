import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { validatePassword } from '../helpers/password.validator';
import { verifyResetToken, resetPassword } from '../services/auth.service';

export const useResetPassword = () => {
  const { token: paramToken } = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || paramToken;
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<{ p1?: string; p2?: string; api?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 10) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setErrors({ api: 'Token no proporcionado.' });
        setIsChecking(false);
        return;
      }
      try {
        await verifyResetToken(token);
      } catch (err: any) {
        setErrors({ api: err.response?.data?.message || 'El enlace ha expirado o es inválido.' });
      } finally {
        setTimeout(() => setIsChecking(false), 800);
      }
    };
    checkToken();
  }, [token]);

  const handleInputChange = (field: 'p1' | 'p2', value: string, setter: (v: string) => void) => {
    setter(value);
    if (errors[field]) setErrors((prev: any) => ({ ...prev, [field]: undefined }));
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const p1Validation = validatePassword(pass);
    const newErrors: any = {
      p1: p1Validation.password1 || undefined,
      p2: !confirmPass
        ? 'Por favor, repetí la contraseña.'
        : pass !== confirmPass
          ? 'Las contraseñas no coinciden.'
          : undefined,
    };

    setErrors(newErrors);
    if (newErrors.p1 || newErrors.p2 || !token) return;

    setLoading(true);
    try {
      await resetPassword(token, pass);
      setSuccess(true);
    } catch (err: any) {
      setErrors({ api: err.response?.data?.message || 'Error al actualizar la contraseña.' });
    } finally {
      setLoading(false);
    }
  };

  return {
    pass,
    setPass,
    confirmPass,
    setConfirmPass,
    showPass,
    setShowPass,
    showConfirm,
    setShowConfirm,
    errors,
    loading,
    success,
    isChecking,
    strength: getPasswordStrength(pass),
    handleInputChange,
    handleReset,
  };
};
