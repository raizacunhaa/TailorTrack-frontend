import { Link, NavLink } from 'react-router-dom';
import { FolderTree, Package } from 'lucide-react';
import logo from '../assets/TailorTrackLogo.png';
import { ROUTES } from '../constants/routes';

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to={ROUTES.products.list} className="flex items-center gap-3">
          <img src={logo} alt="TailorTrack" className="h-10 w-auto object-contain" />
          <span className="text-sm font-bold text-slate-900">TailorTrack</span>
        </Link>

        <div className="flex items-center gap-2">
          <NavLink
            to={ROUTES.products.list}
            className={({ isActive }) =>
              `inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold ${
                isActive ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            <Package className="h-4 w-4" />
            Productos
          </NavLink>
          <NavLink
            to={ROUTES.categories.list}
            className={({ isActive }) =>
              `inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold ${
                isActive ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            <FolderTree className="h-4 w-4" />
            Categorías
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
