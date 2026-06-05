import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle2, Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import logo from '../../assets/TailorTrackLogo.png';
import { ROUTES } from '../../constants/routes';
import { useResetPassword } from '../../hooks/useResetPassword';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const {
    pass,
    setPass,
    confirmPass,
    setConfirmPass,
    showPass,
    setShowPass,
    showConfirm,
    setShowConfirm,
    errors,
    loading,
    success,
    isChecking,
    strength,
    handleInputChange,
    handleReset,
  } = useResetPassword();

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
            Seguridad de Cuenta
          </p>
        </div>

        <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-10 min-h-[400px] flex flex-col justify-center">
          {isChecking ? (
            <div className="flex flex-col items-center animate-pulse">
              <Loader2 className="h-10 w-10 animate-spin text-sky-600 mb-4" />
              <p className="text-slate-500 text-sm">Validando enlace...</p>
            </div>
          ) : errors.api && !success ? (
            <div className="text-center py-4 animate-in fade-in duration-500">
              <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Enlace no válido</h2>
              <p className="text-slate-500 text-sm mb-8">{errors.api}</p>
              <button
                onClick={() => navigate(ROUTES.auth.recover)}
                className="w-full py-3 rounded-2xl bg-sky-600 text-white font-semibold hover:bg-sky-500 transition-all cursor-pointer"
              >
                Solicitar nuevo correo
              </button>
            </div>
          ) : !success ? (
            <>
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Restablece tu contraseña
                </h2>
                <p className="text-slate-500 text-sm mt-2">Debe tener al menos 6 caracteres.</p>
              </div>

              <form onSubmit={handleReset} className="space-y-6" noValidate>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 ml-1">
                    Nueva contraseña
                  </label>
                  <div className="relative group flex items-center">
                    <div className="absolute left-0 pl-3 z-20">
                      <Lock
                        className={`h-4 w-4 ${errors.p1 ? 'text-rose-500' : 'text-slate-400 group-focus-within:text-sky-500'}`}
                      />
                    </div>
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={pass}
                      onChange={(e) => handleInputChange('p1', e.target.value, setPass)}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className={`block w-full h-11 rounded-2xl border bg-slate-50 pl-10 pr-10 text-sm text-slate-900 outline-none transition-all ${errors.p1 ? 'border-rose-300 text-rose-700 focus:border-rose-400 focus:ring-1 focus:ring-rose-100' : 'border-slate-200 focus:border-sky-400 focus:ring-1 focus:ring-sky-100'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-0 pr-3 text-gray-500 hover:text-indigo-400 cursor-pointer"
                    >
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {pass.length > 0 && (
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
                      <div className="h-1 w-full rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${strength <= 25 ? 'bg-rose-400' : strength <= 50 ? 'bg-amber-400' : 'bg-emerald-500'}`}
                          style={{ width: `${strength}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {errors.p1 && (
                    <p className="text-[10px] text-rose-500 font-medium ml-1">{errors.p1}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 ml-1">
                    Confirmar contraseña
                  </label>
                  <div className="relative group flex items-center">
                    <div className="absolute left-0 pl-3 z-20">
                      <Lock
                        className={`h-4 w-4 ${errors.p2 ? 'text-rose-500' : 'text-slate-400 group-focus-within:text-sky-500'}`}
                      />
                    </div>
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={confirmPass}
                      onChange={(e) => handleInputChange('p2', e.target.value, setConfirmPass)}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className={`block w-full h-11 rounded-2xl border bg-slate-50 pl-10 pr-10 text-sm text-slate-900 outline-none transition-all ${errors.p2 ? 'border-rose-300 text-rose-700 focus:border-rose-400 focus:ring-1 focus:ring-rose-100' : 'border-slate-200 focus:border-sky-400 focus:ring-1 focus:ring-sky-100'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-0 pr-3 text-gray-500 hover:text-indigo-400 cursor-pointer"
                    >
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.p2 && (
                    <p className="text-[10px] text-rose-500 font-medium ml-1">{errors.p2}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 py-3 rounded-2xl bg-sky-600 text-white font-semibold hover:bg-sky-500 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Actualizar contraseña'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-slate-900">¡Contraseña actualizada!</h2>
              <p className="text-slate-500 text-sm mt-2 mb-8">
                Ya podés ingresar a <strong>TailorTrack</strong> con tu nueva clave.
              </p>
              <button
                onClick={() => navigate(ROUTES.auth.login)}
                className="block w-full py-3 rounded-2xl bg-sky-600 text-white font-semibold hover:bg-sky-500 transition-all text-center cursor-pointer"
              >
                Ir al Login
              </button>
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          Desarrollado por <span className="font-bold text-slate-700">NrmSoftware</span> © 2026
        </p>
      </div>
    </div>
  );
}
