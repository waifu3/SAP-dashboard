import { ArrowRight, ExternalLink, X } from 'lucide-react';

export default function DetailDrawer({ detail, onClose, onGoToModule }) {
  if (!detail) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 h-full w-full bg-slate-950/50"
        onClick={onClose}
        aria-label="Cerrar detalle"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950">
        <div className="border-b border-slate-200 p-5 dark:border-gray-800">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold text-slate-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                {detail.type}
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                {detail.title}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-gray-400">{detail.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-900 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-100">
            <p className="text-xs font-bold uppercase tracking-wide opacity-75">{detail.status}</p>
            <p className="mt-2 text-sm leading-6">{detail.description}</p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {detail.metrics.map((metric) => (
              <div key={metric.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-gray-400">
                  {metric.label}
                </p>
                <p className="mt-2 text-lg font-bold text-slate-950 dark:text-white">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-950 dark:text-white">Datos relacionados</h3>
            <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 dark:border-gray-800">
              {detail.rows.length ? (
                detail.rows.map((row) => (
                  <div key={`${row.label}-${row.meta}`} className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 last:border-b-0 dark:border-gray-800">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{row.label}</p>
                      <p className="mt-1 truncate text-xs text-slate-500 dark:text-gray-400">{row.meta}</p>
                    </div>
                    <p className="shrink-0 text-sm font-bold text-slate-900 dark:text-white">{row.value}</p>
                  </div>
                ))
              ) : (
                <p className="p-4 text-sm text-slate-600 dark:text-gray-400">No hay datos relacionados disponibles.</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-950 dark:text-white">Acciones sugeridas</h3>
            <div className="mt-3 space-y-2">
              {detail.actions.map((action) => (
                <div key={action} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                  <ArrowRight size={16} className="shrink-0 text-blue-600 dark:text-blue-300" />
                  {action}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 p-5 dark:border-gray-800">
          <button
            type="button"
            onClick={() => onGoToModule(detail.moduleId)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            <ExternalLink size={17} />
            Abrir modulo relacionado
          </button>
        </div>
      </aside>
    </div>
  );
}
