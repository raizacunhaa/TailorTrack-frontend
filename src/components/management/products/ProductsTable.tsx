import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowUp, CheckCircle, Eye, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import type { Product } from '../../../types/product.types';
import { ProductDetailsModal } from './ProductDetailsModal';

type ProductWithIndex = Product & { originalIndex?: number };

interface ProductsTableProps {
  products: ProductWithIndex[];
  onDelete: (product: Product) => void;
  onSort: (column: string) => void;
  currentSortColumn: string | null;
  currentSortDirection: 'asc' | 'desc' | null;
}

export function ProductsTable({
  products,
  onDelete,
  onSort,
  currentSortColumn,
  currentSortDirection,
}: ProductsTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const formatARS = useMemo(
    () =>
      new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
      }),
    [],
  );

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
        <table className="w-full min-w-[980px] border-collapse text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-500">
            <tr>
              <Header onClick={() => onSort('rowNum')}># {renderSortArrow('rowNum')}</Header>
              <Header onClick={() => onSort('name')}>Nombre {renderSortArrow('name')}</Header>
              <Header onClick={() => onSort('unit')}>Marca {renderSortArrow('unit')}</Header>
              <Header onClick={() => onSort('category')}>
                Categoría {renderSortArrow('category')}
              </Header>
              <Header onClick={() => onSort('stock')}>Stock {renderSortArrow('stock')}</Header>
              <Header onClick={() => onSort('price')}>Precio {renderSortArrow('price')}</Header>
              <th className="px-5 py-4 text-center">Catálogo</th>
              <th className="px-5 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-10 text-center text-slate-500">
                  No se encontraron productos.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="transition hover:bg-slate-50/70">
                  <td className="px-5 py-4 font-semibold text-slate-500">
                    {product.originalIndex}
                  </td>
                  <td className="px-5 py-4">
                    <p
                      className="max-w-64 truncate font-semibold text-slate-900"
                      title={product.name}
                    >
                      {product.name}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                      ID: {product.id}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{product.unit || '-'}</td>
                  <td className="px-5 py-4 text-slate-600">
                    {product.category?.name ||
                      product.subCategory?.category?.name ||
                      'Sin categoría'}
                  </td>
                  <td className="px-5 py-4 text-center font-semibold">
                    <span className={product.stock === 0 ? 'text-rose-600' : 'text-slate-900'}>
                      {product.stock ?? 0}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-slate-900">
                    {formatARS.format(product.price ?? 0)}
                  </td>
                  <td className="px-5 py-4 text-center">
                    {product.showingInCatalog ? (
                      <CheckCircle className="mx-auto h-5 w-5 text-emerald-500" />
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        title="Ver detalles"
                        onClick={() => setSelectedProduct(product)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 cursor-pointer"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <Link
                        title="Editar producto"
                        to={ROUTES.products.edit(product.id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-600 transition hover:bg-sky-100"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        title="Eliminar producto"
                        onClick={() => onDelete(product)}
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

      <ProductDetailsModal
        isOpen={Boolean(selectedProduct)}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

function Header({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <th className="px-5 py-4 text-left">
      <button type="button" onClick={onClick} className="inline-flex items-center gap-1">
        {children}
      </button>
    </th>
  );
}
