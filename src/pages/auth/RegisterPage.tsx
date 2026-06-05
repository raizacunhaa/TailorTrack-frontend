import { Link } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, Loader2, Eye, EyeOff, CreditCard } from 'lucide-react';
import logo from '../../assets/TailorTrackLogo.png';
import { ROUTES } from '../../constants/routes';
import { useRegisterForm } from '../../hooks/useRegisterForm';

export default function RegisterPage() {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    dni,
    setDni,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
    loading,
    registerStatus,
    strength,
    handleInputChange,
    handleRegister,
  } = useRegisterForm();

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#ffffff_0%,#f5f7fb_45%,#eef2ff_100%)] text-slate-900 flex flex-col items-center justify-center px-4 py-6 font-sans">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="w-full text-center mb-8">
          <img
            src={logo}
            alt="TailorTrack"
            className="h-22 sm:h-26 w-auto mx-auto mb-3 object-contain"
          />
          <p className="text-[10px] sm:text-xs font-bold text-sky-600 uppercase tracking-[0.25em]">
            Primeros pasos
          </p>
        </div>

        <section className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Sumate a TailorTrack
            </h2>
            <p className="mt-2 text-sm text-slate-500">Ingresá tus datos para empezar</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4" noValidate>
            {errors.api && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-center text-xs text-rose-600">
                {errors.api}
              </div>
            )}

            {/* Fila: Nombre y Apellido */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.25em] text-slate-600">
                  Nombre *
                </label>
                <div className="relative group flex items-center">
                  <div className="absolute left-0 pl-3 z-20">
                    <User
                      className={`h-4 w-4 ${errors.firstName ? 'text-rose-500' : 'text-slate-400 group-focus-within:text-sky-500'}`}
                    />
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value, setFirstName)}
                    placeholder="Juan"
                    className={`block w-full h-11 rounded-2xl border bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition-all ${errors.firstName ? 'border-rose-300 focus:border-rose-400 focus:ring-1 focus:ring-rose-100' : 'border-slate-200 focus:border-sky-400 focus:ring-1 focus:ring-sky-100'}`}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-[10px] text-rose-500 font-medium ml-1">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.25em] text-slate-600">
                  Apellido *
                </label>
                <div className="relative group flex items-center">
                  <div className="absolute left-0 pl-3 z-20">
                    <User
                      className={`h-4 w-4 ${errors.lastName ? 'text-rose-500' : 'text-slate-400 group-focus-within:text-sky-500'}`}
                    />
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value, setLastName)}
                    placeholder="Pérez"
                    className={`block w-full h-11 rounded-2xl border bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition-all ${errors.lastName ? 'border-rose-300 focus:border-rose-400 focus:ring-1 focus:ring-rose-100' : 'border-slate-200 focus:border-sky-400 focus:ring-1 focus:ring-sky-100'}`}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-[10px] text-rose-500 font-medium ml-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Campo DNI */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-[0.25em] text-slate-600">
                DNI *
              </label>
              <div className="relative group flex items-center">
                <div className="absolute left-0 pl-3 z-20">
                  <CreditCard
                    className={`h-4 w-4 ${errors.dni ? 'text-rose-500' : 'text-slate-400 group-focus-within:text-sky-500'}`}
                  />
                </div>
                <input
                  type="text"
                  value={dni}
                  onChange={(e) => handleInputChange('dni', e.target.value, setDni)}
                  placeholder="12345678"
                  className={`block w-full h-11 rounded-2xl border bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition-all ${errors.dni ? 'border-rose-300 focus:border-rose-400 focus:ring-1 focus:ring-rose-100' : 'border-slate-200 focus:border-sky-400 focus:ring-1 focus:ring-sky-100'}`}
                />
              </div>
              {errors.dni && (
                <p className="text-[10px] text-rose-500 font-medium ml-1">{errors.dni}</p>
              )}
            </div>

            {/* Campo Email */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-[0.25em] text-slate-600">
                Correo electrónico *
              </label>
              <div className="relative group flex items-center">
                <div className="absolute left-0 pl-3 z-20">
                  <Mail
                    className={`h-4 w-4 ${errors.email ? 'text-rose-500' : 'text-slate-400 group-focus-within:text-sky-500'}`}
                  />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleInputChange('email', e.target.value, setEmail)}
                  placeholder="tu@correo.com"
                  className={`block w-full h-11 rounded-2xl border bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition-all ${errors.email ? 'border-rose-300 focus:border-rose-400 focus:ring-1 focus:ring-rose-100' : 'border-slate-200 focus:border-sky-400 focus:ring-1 focus:ring-sky-100'}`}
                />
              </div>
              {errors.email && (
                <p className="text-[10px] text-rose-500 font-medium ml-1">{errors.email}</p>
              )}
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-[0.25em] text-slate-600">
                Contraseña *
              </label>
              <div className="relative group flex items-center">
                <div className="absolute left-0 pl-3 z-20">
                  <Lock
                    className={`h-4 w-4 ${errors.password1 ? 'text-rose-500' : 'text-slate-400 group-focus-within:text-sky-500'}`}
                  />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => handleInputChange('password1', e.target.value, setPassword)}
                  placeholder="••••••••"
                  className={`block w-full h-11 rounded-2xl border bg-slate-50 pl-10 pr-10 text-sm text-slate-900 outline-none transition-all ${errors.password1 ? 'border-rose-300 focus:border-rose-400 focus:ring-1 focus:ring-rose-100' : 'border-slate-200 focus:border-sky-400 focus:ring-1 focus:ring-sky-100'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 pr-3 text-slate-500 hover:text-sky-600 z-30 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password1 && (
                <p className="text-[10px] text-rose-500 font-medium ml-1">{errors.password1}</p>
              )}

              {/* Barra de Fuerza */}
              {password.length > 0 && (
                <div className="mt-2 px-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.25em]">
                      Seguridad
                    </span>
                    <span
                      className={`text-[10px] font-bold ${strength <= 25 ? 'text-rose-500' : strength <= 50 ? 'text-amber-500' : 'text-emerald-600'}`}
                    >
                      {strength <= 25 ? 'DÉBIL' : strength <= 50 ? 'MEDIA' : 'FUERTE'}
                    </span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-slate-200 border border-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${strength <= 25 ? 'bg-rose-400' : strength <= 50 ? 'bg-amber-400' : 'bg-emerald-500'}`}
                      style={{ width: `${strength}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirmar Contraseña */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-[0.25em] text-slate-600">
                Confirmar contraseña *
              </label>
              <div className="relative group flex items-center">
                <div className="absolute left-0 pl-3 z-20">
                  <Lock
                    className={`h-4 w-4 ${errors.password2 ? 'text-rose-500' : 'text-slate-400 group-focus-within:text-sky-500'}`}
                  />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  autoComplete="new-password"
                  onChange={(e) =>
                    handleInputChange('password2', e.target.value, setConfirmPassword)
                  }
                  placeholder="••••••••"
                  className={`block w-full h-11 rounded-2xl border bg-slate-50 pl-10 pr-10 text-sm text-slate-900 outline-none transition-all ${errors.password2 ? 'border-rose-300 focus:border-rose-400 focus:ring-1 focus:ring-rose-100' : 'border-slate-200 focus:border-sky-400 focus:ring-1 focus:ring-sky-100'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 pr-3 text-slate-500 hover:text-sky-600 z-30 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{registerStatus}</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  <span>Crear cuenta</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-slate-200 pt-6 text-center">
            <p className="text-sm text-slate-500">
              ¿Ya tenés una cuenta?{' '}
              <Link
                to={ROUTES.auth.login}
                className="font-semibold text-sky-600 hover:text-sky-500"
              >
                Iniciá sesión
              </Link>
            </p>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-slate-500">
          Desarrollado por <span className="font-bold text-slate-700">NrmSoftware</span> © 2026
        </p>
      </div>
    </div>
  );
}
