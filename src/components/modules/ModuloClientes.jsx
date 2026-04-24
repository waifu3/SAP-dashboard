// src/components/modules/ModuloClientes.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function ModuloClientes({ mockData }) {
  const clientesData = mockData.clientesPorIndustria;
  const totalClientes = mockData.kpis[2]?.value || 486;
  const clientesActivos = Math.round(totalClientes * 0.92);
  const tasaRetencion = 87;

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Header del módulo */}
      <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-pink-900 dark:text-pink-300 mb-2">
          👥 Módulo de Clientes
        </h2>
        <p className="text-pink-800 dark:text-pink-400">
          Segmentación de clientes y análisis por industria
        </p>
      </div>

      {/* KPIs de Clientes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Total de Clientes</p>
          <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">
            {totalClientes.toLocaleString('es-CL')}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">clientes registrados</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Clientes Activos</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {clientesActivos}
          </p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            {((clientesActivos / totalClientes) * 100).toFixed(1)}% activos
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Tasa Retención</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {tasaRetencion}%
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">clientes retenidos</p>
        </div>
      </div>

      {/* Gráfico de Clientes por Industria */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Clientes por Industria
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={clientesData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="industria"
              angle={-45}
              textAnchor="end"
              height={100}
              stroke="#9ca3af"
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis
              stroke="#9ca3af"
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #4b5563',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value) => `${value} clientes`}
            />
            <Legend />
            <Bar dataKey="cantidad" name="Cantidad de Clientes" fill="#8884d8" radius={[8, 8, 0, 0]}>
              {clientesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de Industrias */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Detalle por Industria
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Industria</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">Cantidad</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">Porcentaje</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">Potencial</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {clientesData.map((item, idx) => {
                const porcentaje = ((item.cantidad / totalClientes) * 100).toFixed(1);
                return (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
                      {item.industria}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300">
                      {item.cantidad}
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      <div className="flex items-center justify-center">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-xs">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${porcentaje}%`,
                              backgroundColor: COLORS[idx % COLORS.length]
                            }}
                          ></div>
                        </div>
                        <span className="ml-2 text-gray-600 dark:text-gray-400">{porcentaje}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        porcentaje > 20
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : porcentaje > 10
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      }`}>
                        {porcentaje > 20 ? 'Alto' : porcentaje > 10 ? 'Medio' : 'En desarrollo'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-sm font-medium text-green-900 dark:text-green-300 mb-2">✓ Fortaleza</p>
          <p className="text-xs text-green-800 dark:text-green-400">
            Excelente penetración en sector {clientesData[0]?.industria}. Potencial para cross-selling.
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">→ Oportunidad</p>
          <p className="text-xs text-blue-800 dark:text-blue-400">
            Sectores con bajo penetración representan oportunidad de crecimiento. Plan de expansión recomendado.
          </p>
        </div>
      </div>
    </div>
  );
}
