import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Genera los botones de página con puntos suspensivos
  const getPages = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-4 sm:px-6">
      {/* MOBILE */}
      <div className="sm:hidden w-full flex items-center justify-center gap-4">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="rounded-2xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <span className="text-center text-sm text-slate-500">
          Página <span className="font-semibold text-slate-900">{currentPage}</span> de{' '}
          <span className="font-semibold text-slate-900">{totalPages}</span>
        </span>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="rounded-2xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* DESKTOP */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Mostrando{' '}
            <span className="font-semibold text-slate-900">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{' '}
            a{' '}
            <span className="font-semibold text-slate-900">
              {Math.min(currentPage * itemsPerPage, totalItems)}
            </span>{' '}
            de <span className="font-semibold text-slate-900">{totalItems}</span> resultados
          </p>
        </div>

        <div>
          <nav className="isolate inline-flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Prev */}
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-3 py-2 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Pages */}
            {pages.map((page, i) =>
              page === '...' ? (
                <span
                  key={`dots-${i}`}
                  className="relative inline-flex items-center px-4 py-2 text-sm text-slate-400"
                >
                  ...
                </span>
              ) : (
                <button
                  key={`page-${page}-${i}`}
                  onClick={() => onPageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold transition-all duration-300
                ${
                  currentPage === page
                    ? 'bg-sky-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-50'
                }`}
                >
                  {page}
                </button>
              ),
            )}

            {/* Next */}
            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-3 py-2 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
