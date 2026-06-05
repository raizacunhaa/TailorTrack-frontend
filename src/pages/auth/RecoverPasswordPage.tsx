import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, Loader2 } from 'lucide-react';
import logo from '../../assets/TailorTrackLogo.png';
import { ROUTES } from '../../constants/routes';
import { useRecoverPassword } from '../../hooks/useRecoverPassword';

export default function RecoverPasswordPage() {
  const { email, error, loading, sent, handleInputChange, handleRecover } = useRecoverPassword();

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
            Recuperación de Acceso
          </p>
        </div>

        <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-10 text-center">
          {!sent ? (
            <>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">¿Olvidaste tu contraseña?</h2>
              <p className="text-slate-500 text-sm mb-8">
                Ingresá tu email para recibir un enlace de restablecimiento.
              </p>

              <form onSubmit={handleRecover} className="space-y-6" noValidate>
                <div className="space-y-2 text-left">
                  <div className="relative group flex items-center">
                    <div className="absolute left-0 pl-3 z-20">
                      <Mail
                        className={`h-4 w-4 transition-colors ${error ? 'text-rose-500' : 'text-slate-400 group-focus-within:text-sky-500'}`}
                      />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="tu@correo.com"
                      className={`block w-full h-11 rounded-2xl border bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition-all ${
                        error
                          ? 'border-rose-300 text-rose-700 focus:border-rose-400 focus:ring-1 focus:ring-rose-100'
                          : 'border-slate-200 focus:border-sky-400 focus:ring-1 focus:ring-sky-100'
                      }`}
                    />
                  </div>
                  {error && <p className="text-[10px] text-rose-500 font-medium ml-1">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 py-3 rounded-2xl bg-sky-600 text-white font-semibold hover:bg-sky-500 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span>Enviar enlace</span>
                </button>
              </form>
            </>
          ) : (
            <div className="py-4 animate-in fade-in zoom-in duration-300">
              <div className="bg-emerald-50 border border-emerald-200 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Send className="h-5 w-5 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">¡Correo enviado!</h2>
              <p className="text-slate-500 text-sm mt-2 px-4 leading-relaxed">
                Si el email coincide con una cuenta activa de <strong>TailorTrack</strong>,
                recibirás un enlace de restablecimiento en breve.
              </p>
            </div>
          )}

          <Link
            to={ROUTES.auth.login}
            className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-sky-600 transition-colors mx-auto"
          >
            <ArrowLeft className="h-4 w-4" /> Volver al login
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          Desarrollado por <span className="font-bold text-slate-700">NrmSoftware</span> © 2026
        </p>
      </div>
    </div>
  );
}
