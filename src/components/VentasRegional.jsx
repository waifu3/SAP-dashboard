import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function VentasRegional({ datos }) {
  const formatCurrency = (value) => `$${(value / 1000).toFixed(0)}K`;
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div className="mb-6"><h3 className="text-lg font-bold text-gray-900 dark:text-white">Ventas por Región</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Comparación de ventas vs objetivo</p></div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={datos} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="region" stroke="#6b7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6b7280" tickFormatter={formatCurrency} style={{ fontSize: '12px' }} />
          <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#fff'}} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="square" />
          <Bar dataKey="ventas" fill="#3b82f6" name="Ventas Reales" radius={[8, 8, 0, 0]} />
          <Bar dataKey="target" fill="#10b981" name="Objetivo" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
