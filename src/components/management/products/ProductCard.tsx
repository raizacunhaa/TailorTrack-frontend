import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { getDriveDirectLink } from '../../../helpers/url.helper';
import type { Product } from '../../../types/product.types';

interface ProductCardProps {
  product: Product;
}

const formatARS = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 2,
});

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl hover:shadow-slate-200/70">
      <Link to={`/management/products/${product.id}/edit`} className="aspect-square bg-slate-50">
        {product.imageUrl ? (
          <img
            src={getDriveDirectLink(product.imageUrl)}
            alt={product.name}
            className="h-full w-full object-contain p-4"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-300">
            <Package className="h-10 w-10" />
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
          {product.category?.name || 'Sin categoría'}
        </p>
        <h3 className="mt-2 line-clamp-2 text-sm font-bold text-slate-900">{product.name}</h3>
        {product.unit && <p className="mt-2 text-xs text-slate-500">{product.unit}</p>}
        <div className="mt-auto pt-4">
          <p className="text-lg font-black text-slate-900">
            {formatARS.format(product.price || 0)}
          </p>
          <p className="text-xs text-slate-500">Stock: {product.stock ?? 0}</p>
        </div>
      </div>
    </article>
  );
}
