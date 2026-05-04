import type { EmailError } from '../types/errors.types';

export const validateEmail = (email: string): EmailError => {
  const tempErrors: EmailError = {};
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email) {
    tempErrors.email = 'El email es obligatorio.';
  } else if (!emailRegex.test(email)) {
    tempErrors.email = 'El formato del email no es válido.';
  }
  return tempErrors;
};
