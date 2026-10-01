import { useEffect } from 'react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  itemName: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean; // nuevo prop opcional
}

export function ConfirmDeleteModal({
  isOpen,
  itemName,
  onCancel,
  onConfirm,
  isLoading = false,
}: ConfirmDeleteModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
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
        <h2 className="text-lg font-bold text-slate-900">Confirmar desactivación</h2>
        <p className="mt-2 text-sm text-slate-500">
          ¿Seguro que querés desactivar <b>{itemName}</b>?
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <button
            type="button"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 cursor-pointer"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="rounded-2xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:opacity-60 cursor-pointer"
            onClick={onConfirm}
            disabled={isLoading}
          >
            Desactivar
          </button>
        </div>
      </div>
    </div>
  );
}
