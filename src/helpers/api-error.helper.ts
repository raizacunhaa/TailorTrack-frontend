import { AxiosError } from 'axios';

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === 'object' && 'isAxiosError' in error) {
    const axiosError = error as AxiosError<{ error?: string; message?: string }>;
    const backendMessage = axiosError.response?.data?.error ?? axiosError.response?.data?.message;
    if (backendMessage) return backendMessage;
  }
  return fallback;
}
