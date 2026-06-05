import { useAuth } from '../../hooks/useAuth';

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 font-sans text-white">
      <div className="w-full max-w-md bg-gray-800/50 border border-white/10 p-10 rounded-2xl shadow-2xl backdrop-blur-xl text-center flex flex-col items-center">
        <h1 className="text-3xl font-bold text-indigo-400 mb-2 tracking-tight">
          Bienvenido a TailorTrack
        </h1>

        <p className="text-gray-300 mb-8">
          Sesión iniciada como: <span className="font-semibold text-white">{user?.email}</span>
        </p>

        <button
          onClick={logout}
          className="w-full flex justify-center py-3 px-4 rounded-lg bg-red-500/90 text-white text-sm font-semibold shadow-sm hover:bg-red-500 transition-all duration-300 active:scale-95"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
