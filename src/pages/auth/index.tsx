import { Link } from 'react-router-dom';
import { Mail, Lock, LogIn, Loader2, Eye, EyeOff } from 'lucide-react';
import logo from '../../assets/TailorTrackLogo.png';
import { ROUTES } from '../../constants/routes';
import { useLoginForm } from '../../hooks/useLoginForm';

export default function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    errors,
    loading,
    loginStatus,
    showRegisteredMsg,
    handleInputChange,
    handleLogin,
  } = useLoginForm();

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#ffffff_0%,#f5f7fb_45%,#eef2ff_100%)] flex flex-col justify-center items-center px-4 py-6 font-sans text-slate-900">
      <div className="w-full max-w-md flex flex-col items-center [zoom:0.75] md:[zoom:1]">
        <div className="w-full text-center mb-8">
          <img
            src={logo}
            alt="TailorTrack"
            className="h-20 sm:h-24 w-auto mx-auto mb-3 object-contain"
          />
          <p className="text-[10px] sm:text-xs font-bold text-sky-600 uppercase tracking-[0.25em]">
            Gestión Empresarial Integral
          </p>
        </div>

        <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-10">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Iniciar sesión</h2>
            <p className="text-slate-500 text-sm mt-2">Ingresa tus credenciales de acceso</p>
          </div>

          {/* Mensaje de cuenta creada con éxito (viene por URL) */}
          {showRegisteredMsg && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 mb-6">
              <p className="text-xs font-medium text-emerald-700 text-center">
                ¡Cuenta creada con éxito! Ya podés iniciar sesión.
              </p>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleLogin} className="space-y-6" noValidate>
            {/* Error de la API / Backend */}
            {errors.api && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 mb-6">
                <p className="text-xs font-medium text-rose-600 text-center">{errors.api}</p>
              </div>
            )}

            {/* Campo Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 ml-1">
                Correo electrónico
              </label>
              <div className="relative group flex items-center">
                <div className="absolute left-0 pl-3 flex items-center pointer-events-none z-20 translate-y-[1.5px]">
                  <Mail
                    className={`h-4 w-4 transition-colors ${errors.email ? 'text-rose-500' : 'text-slate-400 group-focus-within:text-sky-500'}`}
                  />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => handleInputChange('email', e.target.value, setEmail)}
                  placeholder="tu@correo.com"
                  className={`block w-full h-11 rounded-2xl border bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition-all ${
                    errors.email
                      ? 'border-rose-300 focus:border-rose-400 focus:ring-1 focus:ring-rose-200 text-rose-700 placeholder:text-rose-300'
                      : 'border-slate-200 focus:border-sky-400 focus:ring-1 focus:ring-sky-100'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-[10px] text-rose-500 font-medium ml-1">{errors.email}</p>
              )}
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                title="password"
                className="block text-sm font-medium text-slate-700 ml-1"
              >
                Contraseña
              </label>
              <div className="relative group flex items-center">
                <div className="absolute left-0 pl-3 flex items-center pointer-events-none z-20 translate-y-[1px]">
                  <Lock
                    className={`h-4 w-4 transition-colors ${errors.password1 ? 'text-rose-500' : 'text-slate-400 group-focus-within:text-sky-500'}`}
                  />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handleInputChange('password1', e.target.value, setPassword)}
                  placeholder="••••••••"
                  className={`block w-full h-11 rounded-2xl border bg-slate-50 pl-10 pr-10 text-sm text-slate-900 outline-none transition-all ${
                    errors.password1
                      ? 'border-rose-300 focus:border-rose-400 focus:ring-1 focus:ring-rose-200 text-rose-700 placeholder:text-rose-300'
                      : 'border-slate-200 focus:border-sky-400 focus:ring-1 focus:ring-sky-100'
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-0 pr-3 flex items-center text-slate-500 hover:text-sky-600 transition-colors z-30 cursor-pointer focus:outline-none"
                  title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Errores de password y link de recuperación */}
              <div className="flex flex-col sm:flex-row justify-between gap-2 pt-1">
                {errors.password1 ? (
                  <p className="text-[10px] text-rose-500 font-medium order-2 sm:order-1 ml-1">
                    {errors.password1}
                  </p>
                ) : (
                  <div className="hidden sm:block"></div>
                )}

                <Link
                  to={ROUTES.auth.recover}
                  className="text-sm font-semibold text-sky-600 hover:text-sky-500 order-1 sm:order-2 self-end sm:self-auto"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            {/* Botón Submit Dinámico */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-2xl bg-sky-600 text-white text-sm font-semibold shadow-sm hover:bg-sky-500 transition-all duration-300 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{loginStatus}</span> {/* "Verificando..." o "Iniciando..." */}
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  <span>Entrar al Sistema</span>
                </>
              )}
            </button>
          </form>

          {/* Footer de la Card - Link a Registro */}
          <div className="mt-6 text-center border-t border-slate-200 pt-6">
            <p className="text-sm text-slate-500">
              ¿No tenés una cuenta?{' '}
              <Link
                to={ROUTES.auth.register}
                className="font-semibold text-sky-600 hover:text-sky-500 transition-colors"
              >
                Registrate acá
              </Link>
            </p>
          </div>
        </div>

        {/* Footer de la página */}
        <p className="mt-8 text-center text-xs text-slate-500">
          Desarrollado por <span className="font-bold text-slate-700">NrmSoftware</span> © 2026 •{' '}
          <a
            href="mailto:soporte@ojisoftware.com"
            className="font-semibold text-sky-600 hover:text-sky-500"
          >
            Soporte técnico
          </a>
        </p>
      </div>
    </div>
  );
}
