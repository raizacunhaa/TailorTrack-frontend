import { useState } from 'react';
import { ArrowLeft, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { ConfirmModal } from '../../../components/ConfirmModal';
import { getApiErrorMessage } from '../../../helpers/api-error.helper';
import { ROUTES } from '../../../constants/routes';
import { brandApi } from '../../../services/brand.service';

export default function CreateBrandPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isFormInvalid = !name.trim() || isLoading;

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      setError('');
      await brandApi.create({ name: name.trim() });
      navigate(ROUTES.brands.list);
    } catch (err) {
      setError(
        getApiErrorMessage(err, 'No pudimos crear la marca. Revisá la conexión con el backend.'),
      );
    } finally {
      setIsLoading(false);
      setShowConfirmModal(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => navigate(ROUTES.brands.list)}
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition hover:text-sky-500 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
              <Tag className="h-6 w-6 text-sky-600" />
              Nueva marca
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Creá una marca para asignarla a productos.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-600">
            {error}
          </div>
        )}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!isFormInvalid) setShowConfirmModal(true);
          }}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8"
        >
          <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-600">
              Vista previa
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">{name.trim() || 'Nueva marca'}</p>
            <p className="text-xs text-slate-500">ID: Nuevo</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="brand-name" className="block text-sm font-medium text-slate-700 ml-1">
              Nombre de la marca *
            </label>
            <input
              id="brand-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ej: Levi's"
              autoComplete="off"
              className="block h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-sky-400 focus:ring-1 focus:ring-sky-100"
              required
            />
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(ROUTES.brands.list)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isFormInvalid}
              className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              Crear marca
            </button>
          </div>
        </form>

        <ConfirmModal
          isOpen={showConfirmModal}
          title="Crear marca"
          message={
            <>
              ¿Seguro que querés crear <b>{name.trim()}</b>?
            </>
          }
          isLoading={isLoading}
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleConfirm}
          confirmText="Crear"
        />
      </div>
    </DashboardLayout>
  );
}
