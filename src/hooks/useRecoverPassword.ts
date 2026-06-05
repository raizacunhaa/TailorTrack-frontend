import { useState } from 'react';
import { validateEmail } from '../helpers/email.validator';
import { recoverPassword as recoverService } from '../services/auth.service';

export const useRecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleInputChange = (value: string) => {
    setEmail(value);
    if (error) setError(undefined);
  };

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    if (emailErr.email) {
      setError(emailErr.email);
      return;
    }

    setLoading(true);
    try {
      await recoverService(email);
      setSent(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al procesar la solicitud. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    error,
    loading,
    sent,
    handleInputChange,
    handleRecover,
  };
};
