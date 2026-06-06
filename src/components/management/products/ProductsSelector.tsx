import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import type { Product } from '../../../types/product.types';

interface ProductSelectorProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export default function ProductsSelector({ products, onProductSelect }: ProductSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    return products.filter((product) => product.name.toLowerCase().includes(normalized));
  }, [products, searchTerm]);

  return (
    <div className="w-full space-y-3">
      <label className="block text-sm font-medium text-slate-700 ml-1">Buscar producto</label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Escribí el nombre del producto..."
          className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-sky-400 focus:ring-1 focus:ring-sky-100"
        />
      </div>

      <div className="max-h-72 overflow-y-auto rounded-3xl border border-slate-200 bg-white">
        {filteredProducts.length === 0 ? (
          <p className="p-5 text-center text-sm text-slate-500">No se encontraron productos.</p>
        ) : (
          filteredProducts.map((product) => {
            const outOfStock = (product.stock ?? 0) <= 0;
            return (
              <button
                key={product.id}
                type="button"
                disabled={outOfStock}
                onClick={() => onProductSelect(product)}
                className="flex w-full items-center justify-between gap-4 border-b border-slate-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">{product.name}</p>
                  <p className="text-xs text-slate-500">Stock: {product.stock ?? 0}</p>
                </div>
                <Plus className="h-4 w-4 text-sky-600" />
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
