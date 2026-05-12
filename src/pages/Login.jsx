// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, BarChart3, Database, LogIn, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/useAuth';

export default function Login() {
  const [email, setEmail] = useState('barbara@europlant.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simular pequeño delay de red.
    setTimeout(() => {
      if (login(email, password)) {
        navigate('/dashboard');
      } else {
        setError('Email o contraseña inválidos. Intenta nuevamente.');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8 text-slate-950 dark:bg-gray-950 dark:text-white">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900 lg:grid-cols-[1fr_420px]">
        <section className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold">
              <Database size={18} />
              SAP Business One
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight">
              Panel ejecutivo para operar con datos claros.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
              Ventas, inventario, finanzas, productos y clientes en una vista pensada para seguimiento diario.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-white/10 bg-white/10 p-4">
              <BarChart3 className="mb-3 text-blue-300" size={24} />
              <p className="text-sm font-semibold">KPIs comerciales</p>
              <p className="mt-1 text-xs text-slate-300">Métricas listas para comité.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/10 p-4">
              <ShieldCheck className="mb-3 text-emerald-300" size={24} />
              <p className="text-sm font-semibold">Acceso protegido</p>
              <p className="mt-1 text-xs text-slate-300">Sesión simple para demo.</p>
            </div>
          </div>
        </section>

        <div className="p-6 sm:p-10">
          <div className="mb-8 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-4 ring-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:ring-blue-900/40">
              <LogIn size={28} />
            </div>
            <h1 className="mt-4 text-3xl font-bold text-slate-950 dark:text-white">
              SAP Dashboard
            </h1>
            <p className="mt-2 text-slate-600 dark:text-gray-400">
              Inicia sesión para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                <AlertCircle size={20} className="shrink-0 text-red-600 dark:text-red-400" />
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                required
              />
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                <span className="text-gray-600 dark:text-gray-400">Recuérdame</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Cargando...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Iniciar sesión
                </>
              )}
            </button>
          </form>

          <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
            <p className="mb-2 text-xs font-semibold text-blue-900 dark:text-blue-300">
              Demo - Usa cualquier email y contraseña con mínimo 6 caracteres.
            </p>
            <p className="text-xs text-blue-800 dark:text-blue-400">
              Email: <span className="font-mono">barbara@europlant.com</span>
            </p>
            <p className="text-xs text-blue-800 dark:text-blue-400">
              Password: <span className="font-mono">password123</span>
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            © 2026 SAP Dashboard. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
