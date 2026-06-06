import type { ReactNode } from 'react';

interface ModalDialogProps {
  open?: boolean;
  title?: string;
  children?: ReactNode;
  onClose?: () => void;
}

export default function ModalDialog({
  open = false,
  title = 'Confirmar acción',
  children,
  onClose,
}: ModalDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <div className="mt-3 text-sm text-slate-500">{children}</div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
