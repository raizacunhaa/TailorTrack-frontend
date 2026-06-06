import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Box, CheckCircle, FolderTree, Package, Pencil, X } from 'lucide-react';
import { ROUTES } from '../../../constants/routes';
import { getDriveDirectLink } from '../../../helpers/url.helper';
import type { Product } from '../../../types/product.types';

interface ProductDetailsModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
}

const formatARS = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 2,
});

export function ProductDetailsModal({ isOpen, product, onClose }: ProductDetailsModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-900/30 p-0 backdrop-blur-sm md:items-center md:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/10 md:rounded-3xl md:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-600">
              Producto #{product.id}
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">{product.name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 hover:bg-slate-50 cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-[260px_1fr]">
          <div className="aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            {product.imageUrl ? (
              <img
                src={getDriveDirectLink(product.imageUrl)}
                alt={product.name}
                className="h-full w-full object-contain p-4"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-300">
                <Package className="h-12 w-12" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm leading-relaxed text-slate-600">
                {product.description || 'Este producto no tiene descripción cargada.'}
              </p>
              <div className="mt-4 border-t border-slate-200 pt-4">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                  Precio
                </p>
                <p className="mt-1 text-3xl font-black text-slate-900">
                  {formatARS.format(product.price || 0)}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <InfoTile icon={<FolderTree className="h-4 w-4" />} label="Categoría">
                {product.category?.name || product.subCategory?.category?.name || 'Sin categoría'}
              </InfoTile>
              <InfoTile icon={<Box className="h-4 w-4" />} label="Unidad">
                {product.unit || 'Sin unidad'}
              </InfoTile>
              <InfoTile icon={<Package className="h-4 w-4" />} label="Stock">
                {product.stock ?? 0} u.
              </InfoTile>
            </div>

            <div
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                product.showingInCatalog
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-slate-50 text-slate-500'
              }`}
            >
              <CheckCircle className="h-3.5 w-3.5" />
              {product.showingInCatalog ? 'Visible en catálogo' : 'Oculto del catálogo'}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Cerrar
          </button>
          <Link
            to={ROUTES.products.edit(product.id)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-500"
          >
            <Pencil className="h-4 w-4" />
            Editar
          </Link>
        </div>
      </div>
    </div>
  );
}

function InfoTile({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-2 flex items-center gap-2 text-sky-600">
        {icon}
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          {label}
        </span>
      </div>
      <p className="text-sm font-semibold text-slate-900">{children}</p>
    </div>
  );
}
