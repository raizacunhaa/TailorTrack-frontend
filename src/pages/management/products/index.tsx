import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Pagination from '../../../components/PaginationManagement';
import SearchBar from '../../../components/SearchBar';
import { ConfirmDeleteModal } from '../../../components/ConfirmDeleteModal';
import { ProductsTable } from '../../../components/management/products/ProductsTable';
import { ROUTES } from '../../../constants/routes';
import { productApi } from '../../../services/product.service';
import type { Product } from '../../../types/product.types';

const ITEMS_PER_PAGE = 8;

export default function ProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        setProducts(await productApi.getAllProducts());
      } catch {
        setError('No pudimos cargar los productos desde el backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products
      .filter((product) => product.status !== false)
      .filter((product) => product.name.toLowerCase().includes(normalizedQuery))
      .map((product, index) => ({ ...product, originalIndex: index + 1 }));

    if (!sortColumn || !sortDirection) return filtered;

    return [...filtered].sort((a, b) => {
      const getValue = (product: Product & { originalIndex?: number }) => {
        switch (sortColumn) {
          case 'rowNum':
            return product.originalIndex ?? 0;
          case 'brand.name':
            return product.brand?.name ?? '';
          case 'category':
            return product.category?.name ?? product.subCategory?.category?.name ?? '';
          default:
            return product[sortColumn as keyof Product] ?? '';
        }
      };

      const first = getValue(a);
      const second = getValue(b);
      if (typeof first === 'number' || typeof second === 'number') {
        return sortDirection === 'asc'
          ? Number(first) - Number(second)
          : Number(second) - Number(first);
      }
      return sortDirection === 'asc'
        ? String(first).localeCompare(String(second))
        : String(second).localeCompare(String(first));
    });
  }, [products, query, sortColumn, sortDirection]);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((direction) =>
        direction === 'asc' ? 'desc' : direction === 'desc' ? null : 'asc',
      );
      if (sortDirection === 'desc') setSortColumn(null);
      return;
    }
    setSortColumn(column);
    setSortDirection('asc');
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      setDeleting(true);
      await productApi.disable(productToDelete.id);
      setProducts((current) => current.filter((product) => product.id !== productToDelete.id));
      setProductToDelete(null);
      if (currentProducts.length === 1 && currentPage > 1) setCurrentPage((page) => page - 1);
    } catch {
      setError('No pudimos eliminar el producto.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <DashboardLayout
      title="Productos"
      subtitle="Gestioná stock, precios, categorías y visibilidad del catálogo."
      actions={
        <button
          type="button"
          onClick={() => navigate(ROUTES.products.create)}
          className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500 active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Nuevo producto
        </button>
      }
    >
      <div className="space-y-5">
        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-600">
            {error}
          </div>
        )}

        <SearchBar
          value={query}
          onChange={(value) => {
            setQuery(value);
            setCurrentPage(1);
          }}
          placeholder="Buscar por nombre del producto..."
        />

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-xl shadow-slate-200/60">
            Cargando productos...
          </div>
        ) : (
          <>
            <ProductsTable
              products={currentProducts}
              onDelete={setProductToDelete}
              onSort={handleSort}
              currentSortColumn={sortColumn}
              currentSortDirection={sortDirection}
            />
            <Pagination
              totalItems={filteredProducts.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}

        {productToDelete && (
          <ConfirmDeleteModal
            isOpen
            itemName={productToDelete.name}
            isLoading={deleting}
            onCancel={() => setProductToDelete(null)}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
