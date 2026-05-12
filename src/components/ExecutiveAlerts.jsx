import { AlertTriangle, CheckCircle2, CircleDollarSign, PackageSearch } from 'lucide-react';

const styles = {
  critical: {
    icon: AlertTriangle,
    className: 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200',
    iconClassName: 'text-red-600 dark:text-red-300',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200',
    iconClassName: 'text-amber-600 dark:text-amber-300',
  },
  info: {
    icon: CircleDollarSign,
    className: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200',
    iconClassName: 'text-blue-600 dark:text-blue-300',
  },
};

export default function ExecutiveAlerts({ alerts }) {
  if (!alerts.length) {
    return (
      <section className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300" size={20} />
          <div>
            <h2 className="text-sm font-bold">Sin alertas críticas</h2>
            <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
              Los indicadores filtrados están dentro de rangos esperados.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const criticalCount = alerts.filter((alert) => alert.severity === 'critical').length;

  return (
    <section className="mb-6">
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">Alertas ejecutivas</h2>
          <p className="text-sm text-slate-600 dark:text-gray-400">
            Prioridades detectadas con los filtros actuales.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
          <PackageSearch size={14} />
          {criticalCount} críticas
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {alerts.map((alert) => {
          const alertStyle = styles[alert.severity] || styles.info;
          const Icon = alertStyle.icon;

          return (
            <article key={alert.id} className={`rounded-lg border p-4 ${alertStyle.className}`}>
              <div className="flex items-start gap-3">
                <Icon className={`mt-0.5 shrink-0 ${alertStyle.iconClassName}`} size={20} />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold">{alert.title}</h3>
                  <p className="mt-1 text-sm opacity-90">{alert.description}</p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide opacity-80">
                    {alert.action}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
