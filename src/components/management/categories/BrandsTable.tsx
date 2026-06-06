import { ArrowUp, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import type { Category } from '../../../types/category.types';

type CategoryWithIndex = Category & { originalIndex?: number };

interface BrandsTableProps {
  brands: CategoryWithIndex[];
  onDelete: (category: Category) => void;
  onSort: (column: string) => void;
  currentSortColumn: string | null;
  currentSortDirection: 'asc' | 'desc' | null;
}

export function BrandsTable({
  brands,
  onDelete,
  onSort,
  currentSortColumn,
  currentSortDirection,
}: BrandsTableProps) {
  const renderSortArrow = (column: string) => {
    const isActive = currentSortColumn === column && currentSortDirection;
    return (
      <ArrowUp
        className={`h-3 w-3 transition-all ${
          isActive ? 'opacity-100' : 'opacity-0'
        } ${currentSortDirection === 'desc' ? 'rotate-180' : ''}`}
      />
    );
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-500">
            <tr>
              <th className="w-20 px-5 py-4 text-left">
                <button
                  type="button"
                  onClick={() => onSort('rowNum')}
                  className="inline-flex items-center gap-1"
                >
                  #{renderSortArrow('rowNum')}
                </button>
              </th>
              <th className="px-5 py-4 text-left">
                <button
                  type="button"
                  onClick={() => onSort('name')}
                  className="inline-flex items-center gap-1"
                >
                  Nombre
                  {renderSortArrow('name')}
                </button>
              </th>
              <th className="w-36 px-5 py-4 text-center">Estado</th>
              <th className="w-32 px-5 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {brands.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-slate-500">
                  No se encontraron categorías.
                </td>
              </tr>
            ) : (
              brands.map((category) => (
                <tr key={category.id} className="transition hover:bg-slate-50/70">
                  <td className="px-5 py-4 font-semibold text-slate-500">
                    {category.originalIndex}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">{category.name}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                      ID: {category.id}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {category.status === false ? 'Inactiva' : 'Activa'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        title="Editar categoría"
                        to={ROUTES.categories.edit(category.id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-600 transition hover:bg-sky-100"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        title="Eliminar categoría"
                        onClick={() => onDelete(category)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-600 transition hover:bg-rose-100 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
