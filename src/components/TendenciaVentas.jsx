import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function TendenciaVentas({ datos }) {
  const formatCurrency = (value) => `$${(value / 1000).toFixed(0)}K`;
  return (<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
    <div className="mb-6"><h3 className="text-lg font-bold text-gray-900 dark:text-white">Tendencia de Ventas (Últimos 12 Meses)</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">Evolución de ventas, presupuesto y ganancia</p></div>
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={datos} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
          <linearGradient id="colorPresupuesto" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
          <linearGradient id="colorGanancia" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
        <XAxis dataKey="mes" stroke="#6b7280" style={{ fontSize: '12px' }} />
        <YAxis stroke="#6b7280" tickFormatter={formatCurrency} style={{ fontSize: '12px' }} />
        <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#fff'}} labelStyle={{ color: '#fff' }} />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
        <Area type="monotone" dataKey="ventas" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVentas)" name="Ventas Reales" strokeWidth={2} />
        <Area type="monotone" dataKey="presupuesto" stroke="#10b981" fillOpacity={1} fill="url(#colorPresupuesto)" name="Presupuesto" strokeWidth={2} />
        <Area type="monotone" dataKey="ganancia" stroke="#f59e0b" fillOpacity={1} fill="url(#colorGanancia)" name="Ganancia" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
    <div className="mt-6 grid grid-cols-3 gap-4">
      <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4"><p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Ventas Promedio</p><p className="text-lg font-bold text-blue-900 dark:text-blue-100">{formatCurrency(datos.reduce((a, b) => a + b.ventas, 0) / datos.length)}</p></div>
      <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4"><p className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">Total Presupuesto</p><p className="text-lg font-bold text-green-900 dark:text-green-100">{formatCurrency(datos.reduce((a, b) => a + b.presupuesto, 0))}</p></div>
      <div className="bg-orange-50 dark:bg-orange-950 rounded-lg p-4"><p className="text-xs text-orange-600 dark:text-orange-400 font-medium mb-1">Ganancia Total</p><p className="text-lg font-bold text-orange-900 dark:text-orange-100">{formatCurrency(datos.reduce((a, b) => a + b.ganancia, 0))}</p></div>
    </div>
  </div>);
}
