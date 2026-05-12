import { ClipboardList, Target, TrendingUp } from 'lucide-react';

const toneClasses = {
  positive: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200',
  warning: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200',
  critical: 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200',
};

export default function ExecutiveSummary({ summary }) {
  return (
    <section className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_1.4fr]">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
            <ClipboardList size={14} />
            Resumen ejecutivo
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            {summary.status}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-gray-400">
            {summary.narrative}
          </p>
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
            <Target className="mt-0.5 shrink-0" size={18} />
            <p>{summary.recommendation}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {summary.points.map((point) => (
            <article key={point.label} className={`rounded-lg border p-4 ${toneClasses[point.tone]}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide opacity-75">
                    {point.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold">{point.value}</p>
                </div>
                <TrendingUp className="shrink-0 opacity-70" size={20} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
