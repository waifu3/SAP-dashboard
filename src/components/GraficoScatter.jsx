// src/components/GraficoScatter.jsx
import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function GraficoScatter({ productos }) {
  // Preparar datos: ventas vs margen por producto
  const data = productos.map((p) => ({
    name: p.nombre,
    x: p.ventas / 1000000, // Ventas en millones
    y: ((p.ganancia / p.ventas) * 100).toFixed(1), // Margen en %
    ganancia: p.ganancia
  }));

  // Colores basados en ganancia
  const getColor = (ganancia) => {
    if (ganancia > 80000) return '#10b981';
    if (ganancia > 50000) return '#3b82f6';
    if (ganancia > 30000) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Análisis Ventas vs Margen
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Correlación entre volumen de ventas y margen de ganancia
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            type="number"
            dataKey="x"
            name="Ventas (Millones)"
            label={{ value: 'Ventas ($M)', position: 'insideBottomRight', offset: -10 }}
            stroke="#9ca3af"
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Margen (%)"
            label={{ value: 'Margen (%)', angle: -90, position: 'insideLeftMiddle' }}
            stroke="#9ca3af"
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #4b5563',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value, name) => {
              if (name === 'x') return [`$${value.toFixed(1)}M`, 'Ventas'];
              if (name === 'y') return [`${value}%`, 'Margen'];
              return value;
            }}
            labelFormatter={(label) => `${label}`}
          />
          <Legend />
          <Scatter name="Productos" data={data} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.ganancia)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

     
      {/* Legenda de colores */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-600"></div>
          <span className="text-xs text-gray-700 dark:text-gray-300">Ganancia &gt; $80K</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          <span className="text-xs text-gray-700 dark:text-gray-300">$50K - $80K</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-600"></div>
          <span className="text-xs text-gray-700 dark:text-gray-300">$30K - $50K</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-600"></div>
          <span className="text-xs text-gray-700 dark:text-gray-300">Ganancia &lt; $30K</span>
        </div>
      </div>

      {/* Top 3 productos por margen */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">
          Top 3 por Margen
        </h4>
        <div className="space-y-2">
          {data
            .sort((a, b) => parseFloat(b.y) - parseFloat(a.y))
            .slice(0, 3)
            .map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {idx + 1}. {item.name}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {item.y}%
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
