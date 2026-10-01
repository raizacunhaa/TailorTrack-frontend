import { ArrowUp, Pencil, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import type { Brand } from '../../../types/brand.types';

type BrandWithIndex = Brand & { originalIndex?: number };

interface BrandsTableProps {
  brands: BrandWithIndex[];
  onDelete: (brand: Brand) => void;
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
        <table className="w-full min-w-[560px] border-collapse text-sm">
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
              <th className="w-32 px-5 py-4 text-center">Productos</th>
              <th className="w-36 px-5 py-4 text-center">Estado</th>
              <th className="w-32 px-5 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {brands.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-slate-500">
                  No se encontraron marcas.
                </td>
              </tr>
            ) : (
              brands.map((brand) => (
                <tr key={brand.id} className="transition hover:bg-slate-50/70">
                  <td className="px-5 py-4 font-semibold text-slate-500">{brand.originalIndex}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">{brand.name}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                      ID: {brand.id}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-center text-slate-600">
                    {brand._count?.products ?? 0}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {brand.status === false ? 'Inactiva' : 'Activa'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        title="Editar marca"
                        to={ROUTES.brands.edit(brand.id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-600 transition hover:bg-sky-100"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        title="Eliminar marca"
                        onClick={() => onDelete(brand)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-600 transition hover:bg-rose-100 cursor-pointer"
                      >
                        <EyeOff className="h-4 w-4" />
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
