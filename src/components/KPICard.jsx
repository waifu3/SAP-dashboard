import { TrendingUp, TrendingDown, ShoppingCart, Users, BarChart3, Package } from 'lucide-react';

const iconMap = { TrendingUp, TrendingDown, ShoppingCart, Users, BarChart3, Package };
const colorConfig = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-950', border: 'border-blue-200 dark:border-blue-800', icon: 'text-blue-600 dark:text-blue-400' },
  green: { bg: 'bg-green-50 dark:bg-green-950', border: 'border-green-200 dark:border-green-800', icon: 'text-green-600 dark:text-green-400' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-950', border: 'border-purple-200 dark:border-purple-800', icon: 'text-purple-600 dark:text-purple-400' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-950', border: 'border-orange-200 dark:border-orange-800', icon: 'text-orange-600 dark:text-orange-400' },
  red: { bg: 'bg-red-50 dark:bg-red-950', border: 'border-red-200 dark:border-red-800', icon: 'text-red-600 dark:text-red-400' }
};

export default function KPICard({ kpi }) {
  const Icon = iconMap[kpi.icon] || TrendingUp;
  const colors = colorConfig[kpi.color] || colorConfig.blue;
  const isPositive = kpi.change >= 0;
  const formatValue = (value) => kpi.currency ? `$${(value / 1000000).toFixed(1)}M` : kpi.unit === '%' ? `${value.toFixed(1)}%` : value.toLocaleString('es-CL');

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-lg p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1"><p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{kpi.title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatValue(kpi.value)}{kpi.unit && <span className="text-sm ml-1">{kpi.unit}</span>}</p></div>
        <div className={`${colors.icon} bg-white dark:bg-gray-800 p-3 rounded-lg`}><Icon size={24} /></div>
      </div>
      <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        <span className="text-sm font-medium">{Math.abs(kpi.change)}% {isPositive ? 'aumento' : 'disminución'}</span>
      </div>
    </div>
  );
}
