import { useEffect } from 'react';
import type { ReactNode } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: ReactNode; // <-- cambio aquí
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: 'danger' | 'success' | 'primary';
}

export function ConfirmModal({
  isOpen,
  title = 'Confirmar acción',
  message,
  onCancel,
  onConfirm,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isLoading = false,
  variant = 'primary',
}: ConfirmModalProps) {
  const variantClasses = {
    primary: 'bg-sky-600 hover:bg-sky-500',
    success: 'bg-sky-600 hover:bg-sky-500',
    danger: 'bg-rose-600 hover:bg-rose-500',
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onCancel();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-xl shadow-slate-900/10"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">
          {message} {/* Ahora puede ser JSX */}
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <button
            type="button"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 cursor-pointer"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`rounded-2xl px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-50 cursor-pointer ${variantClasses[variant]}`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
