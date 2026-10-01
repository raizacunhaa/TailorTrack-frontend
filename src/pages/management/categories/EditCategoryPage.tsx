import { useEffect, useState } from 'react';
import { ArrowLeft, SquarePen } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { ConfirmModal } from '../../../components/ConfirmModal';
import { getApiErrorMessage } from '../../../helpers/api-error.helper';
import { ROUTES } from '../../../constants/routes';
import { categoryApi } from '../../../services/category.service';

export default function EditCategoryPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [initialName, setInitialName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError('');
        const category = await categoryApi.getById(id);
        setName(category.name);
        setInitialName(category.name);
      } catch {
        setError('No pudimos cargar la categoría desde el backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const isFormInvalid = !name.trim() || saving || name.trim() === initialName.trim();

  const handleConfirm = async () => {
    if (!id) return;
    try {
      setSaving(true);
      setError('');
      await categoryApi.update(id, { name: name.trim() });
      navigate(ROUTES.categories.list);
    } catch (err) {
      setError(getApiErrorMessage(err, 'No pudimos guardar los cambios.'));
    } finally {
      setSaving(false);
      setShowConfirmModal(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => navigate(ROUTES.categories.list)}
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition hover:text-sky-500 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>

        <div className="mb-5">
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
            <SquarePen className="h-6 w-6 text-sky-600" />
            Editar categoría
          </h1>
          <p className="mt-1 text-sm text-slate-500">Actualizá el nombre de la categoría.</p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-xl shadow-slate-200/70">
            Cargando categoría...
          </div>
        ) : (
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
              <p className="mt-2 text-lg font-bold text-slate-900">
                {name.trim() || 'Categoría sin nombre'}
              </p>
              <p className="text-xs text-slate-500">ID: {id}</p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="category-name"
                className="block text-sm font-medium text-slate-700 ml-1"
              >
                Nombre de la categoría *
              </label>
              <input
                id="category-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ingrese el nombre"
                autoComplete="off"
                className="block h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-sky-400 focus:ring-1 focus:ring-sky-100"
                required
              />
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate(ROUTES.categories.list)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isFormInvalid}
                className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        )}

        <ConfirmModal
          isOpen={showConfirmModal}
          title="Guardar cambios"
          message={
            <>
              ¿Seguro que querés guardar <b>{name.trim()}</b>?
            </>
          }
          isLoading={saving}
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleConfirm}
          confirmText="Guardar"
        />
      </div>
    </DashboardLayout>
  );
}
