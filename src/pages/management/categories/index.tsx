import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Pagination from '../../../components/PaginationManagement';
import SearchBar from '../../../components/SearchBar';
import { ConfirmDeleteModal } from '../../../components/ConfirmDeleteModal';
import { BrandsTable } from '../../../components/management/categories/BrandsTable';
import { ROUTES } from '../../../constants/routes';
import { categoryApi } from '../../../services/category.service';
import type { Category } from '../../../types/category.types';

const ITEMS_PER_PAGE = 8;

export default function CategoriesPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError('');
        setCategories(await categoryApi.getAll());
      } catch {
        setError('No pudimos cargar las categorías desde el backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = categories
      .filter((category) => category.status !== false)
      .filter((category) => category.name.toLowerCase().includes(normalizedQuery))
      .map((category, index) => ({ ...category, originalIndex: index + 1 }));

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
  }, [categories, query, sortColumn, sortDirection]);

  const currentCategories = filteredCategories.slice(
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
    if (!categoryToDelete) return;
    try {
      setDeleting(true);
      await categoryApi.delete(categoryToDelete.id);
      setCategories((current) => current.filter((category) => category.id !== categoryToDelete.id));
      setCategoryToDelete(null);
      if (currentCategories.length === 1 && currentPage > 1) setCurrentPage((page) => page - 1);
    } catch {
      setError('No pudimos eliminar la categoría. Revisá si tiene productos asociados.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <DashboardLayout
      title="Categorías"
      subtitle="Administrá las categorías disponibles para clasificar productos."
      actions={
        <button
          type="button"
          onClick={() => navigate(ROUTES.categories.create)}
          className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500 active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Nueva categoría
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
          placeholder="Buscar por nombre de la categoría..."
        />

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-xl shadow-slate-200/60">
            Cargando categorías...
          </div>
        ) : (
          <>
            <BrandsTable
              brands={currentCategories}
              onDelete={setCategoryToDelete}
              onSort={handleSort}
              currentSortColumn={sortColumn}
              currentSortDirection={sortDirection}
            />
            <Pagination
              totalItems={filteredCategories.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}

        {categoryToDelete && (
          <ConfirmDeleteModal
            isOpen
            itemName={categoryToDelete.name}
            isLoading={deleting}
            onCancel={() => setCategoryToDelete(null)}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
