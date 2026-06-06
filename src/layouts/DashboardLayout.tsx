import type { ReactNode } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FolderTree, LogOut, Menu, Package, UserCircle, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/TailorTrackLogo.png';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
}

const navigation = [
  { name: 'Productos', href: ROUTES.products.list, icon: Package },
  { name: 'Categorías', href: ROUTES.categories.list, icon: FolderTree },
];

function getUserName(user: ReturnType<typeof useAuth>['user']) {
  if (!user) return 'Usuario';
  return `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || user.email;
}

export default function DashboardLayout({
  children,
  title,
  subtitle,
  actions,
}: DashboardLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    navigate(ROUTES.auth.login, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#ffffff_0%,#f5f7fb_45%,#eef2ff_100%)] font-sans text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to={ROUTES.products.list} className="flex items-center gap-3">
            <img src={logo} alt="TailorTrack" className="h-10 w-auto object-contain" />
            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-none text-slate-900">TailorTrack</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-sky-600">
                Gestión
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-sky-50 text-sky-700 ring-1 ring-sky-100'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <UserCircle className="h-5 w-5 text-slate-400" />
              <div className="max-w-44 leading-none">
                <p className="truncate text-xs font-semibold text-slate-700">{getUserName(user)}</p>
                <p className="mt-1 truncate text-[10px] text-slate-500">{user?.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              title="Cerrar sesión"
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-600 transition hover:bg-rose-100 disabled:opacity-60 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 md:hidden"
            aria-label="Abrir menú"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold ${
                        isActive ? 'bg-sky-50 text-sky-700' : 'text-slate-600'
                      }`
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </NavLink>
                );
              })}
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-rose-600 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                {isLoggingOut ? 'Saliendo...' : 'Cerrar sesión'}
              </button>
            </nav>
          </div>
        )}
      </header>

      {(title || actions) && (
        <section className="border-b border-slate-200 bg-white/70">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <div>
              {title && (
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
              )}
              {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
            </div>
            {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
          </div>
        </section>
      )}

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
