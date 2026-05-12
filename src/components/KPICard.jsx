import {
  BarChart3,
  Boxes,
  CircleDollarSign,
  Package,
  Percent,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  Users,
} from 'lucide-react';

const iconMap = {
  BarChart3,
  Boxes,
  CircleDollarSign,
  Package,
  Percent,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  Users,
};

const colorConfig = {
  blue: {
    accent: 'bg-blue-500',
    icon: 'text-blue-600 dark:text-blue-300',
    ring: 'ring-blue-100 dark:ring-blue-900/40',
  },
  green: {
    accent: 'bg-emerald-500',
    icon: 'text-emerald-600 dark:text-emerald-300',
    ring: 'ring-emerald-100 dark:ring-emerald-900/40',
  },
  purple: {
    accent: 'bg-violet-500',
    icon: 'text-violet-600 dark:text-violet-300',
    ring: 'ring-violet-100 dark:ring-violet-900/40',
  },
  orange: {
    accent: 'bg-orange-500',
    icon: 'text-orange-600 dark:text-orange-300',
    ring: 'ring-orange-100 dark:ring-orange-900/40',
  },
  red: {
    accent: 'bg-red-500',
    icon: 'text-red-600 dark:text-red-300',
    ring: 'ring-red-100 dark:ring-red-900/40',
  },
  cyan: {
    accent: 'bg-cyan-500',
    icon: 'text-cyan-600 dark:text-cyan-300',
    ring: 'ring-cyan-100 dark:ring-cyan-900/40',
  },
  amber: {
    accent: 'bg-amber-500',
    icon: 'text-amber-600 dark:text-amber-300',
    ring: 'ring-amber-100 dark:ring-amber-900/40',
  },
  slate: {
    accent: 'bg-slate-500',
    icon: 'text-slate-600 dark:text-slate-300',
    ring: 'ring-slate-100 dark:ring-slate-800',
  },
};

export default function KPICard({ kpi }) {
  const Icon = iconMap[kpi.icon] || TrendingUp;
  const colors = colorConfig[kpi.color] || colorConfig.blue;
  const isPositive = kpi.change >= 0;

  const formatValue = (value) => {
    if (kpi.currency) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }

    if (kpi.unit === '%') {
      return `${value.toFixed(1)}%`;
    }

    return value.toLocaleString('es-CL');
  };

  return (
    <div className={`group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm ring-4 ${colors.ring} transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900`}>
      <div className={`absolute inset-x-0 top-0 h-1 ${colors.accent}`} />

      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="mb-2 truncate text-sm font-semibold text-slate-600 dark:text-gray-400">
            {kpi.title}
          </p>
          <p className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            {formatValue(kpi.value)}
            {kpi.unit && kpi.unit !== '%' && <span className="ml-1 text-sm">{kpi.unit}</span>}
          </p>
        </div>

        <div className={`${colors.icon} rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-gray-700 dark:bg-gray-800`}>
          <Icon size={22} />
        </div>
      </div>

      <div className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold ${isPositive ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'}`}>
        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        <span>{Math.abs(kpi.change)}% {isPositive ? 'aumento' : 'disminución'}</span>
      </div>
    </div>
  );
}
