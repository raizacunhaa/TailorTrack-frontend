import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Pagination from '../../../components/PaginationManagement';
import SearchBar from '../../../components/SearchBar';
import { ConfirmDeleteModal } from '../../../components/ConfirmDeleteModal';
import { BrandsTable } from '../../../components/management/brands/BrandsTable';
import { getApiErrorMessage } from '../../../helpers/api-error.helper';
import { ROUTES } from '../../../constants/routes';
import { brandApi } from '../../../services/brand.service';
import type { Brand } from '../../../types/brand.types';

const ITEMS_PER_PAGE = 8;

export default function BrandsPage() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        setError('');
        setBrands(await brandApi.getAll());
      } catch {
        setError('No pudimos cargar las marcas desde el backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const filteredBrands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = brands
      .filter((brand) => brand.status !== false)
      .filter((brand) => brand.name.toLowerCase().includes(normalizedQuery))
      .map((brand, index) => ({ ...brand, originalIndex: index + 1 }));

    if (!sortColumn || !sortDirection) return filtered;

    return [...filtered].sort((a, b) => {
      const first = sortColumn === 'rowNum' ? a.originalIndex : a.name;
      const second = sortColumn === 'rowNum' ? b.originalIndex : b.name;
      if (sortColumn === 'rowNum') {
        return sortDirection === 'asc'
          ? Number(first) - Number(second)
          : Number(second) - Number(first);
      }
      return sortDirection === 'asc'
        ? String(first).localeCompare(String(second))
        : String(second).localeCompare(String(first));
    });
  }, [brands, query, sortColumn, sortDirection]);

  const currentBrands = filteredBrands.slice(
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
    if (!brandToDelete) return;
    try {
      setDeleting(true);
      await brandApi.delete(brandToDelete.id);
      setBrands((current) => current.filter((brand) => brand.id !== brandToDelete.id));
      if (currentBrands.length === 1 && currentPage > 1) setCurrentPage((page) => page - 1);
    } catch (err) {
      setError(
        getApiErrorMessage(
          err,
          'No pudimos eliminar la marca. Revisá si tiene productos asociados.',
        ),
      );
    } finally {
      setBrandToDelete(null);
      setDeleting(false);
    }
  };

  return (
    <DashboardLayout
      title="Marcas"
      subtitle="Administrá las marcas disponibles para clasificar productos."
      actions={
        <button
          type="button"
          onClick={() => navigate(ROUTES.brands.create)}
          className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500 active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Nueva marca
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
          placeholder="Buscar por nombre de la marca..."
        />

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-xl shadow-slate-200/60">
            Cargando marcas...
          </div>
        ) : (
          <>
            <BrandsTable
              brands={currentBrands}
              onDelete={setBrandToDelete}
              onSort={handleSort}
              currentSortColumn={sortColumn}
              currentSortDirection={sortDirection}
            />
            <Pagination
              totalItems={filteredBrands.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}

        {brandToDelete && (
          <ConfirmDeleteModal
            isOpen
            itemName={brandToDelete.name}
            isLoading={deleting}
            onCancel={() => setBrandToDelete(null)}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
