// src/components/GraficoWaterfall.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Cell as CellComponent } from 'recharts';

export default function GraficoWaterfall({ mockData }) {
  // Datos simulados de flujo de ganancia
  const ingresosTotales = mockData.kpis[0].value;
  const costos = ingresosTotales * 0.45; // 45% de costos
  const gastosOperacionales = ingresosTotales * 0.15; // 15% gastos operacionales
  const impuestos = (ingresosTotales - costos - gastosOperacionales) * 0.25; // 25% impuestos
  const gananciaNet = ingresosTotales - costos - gastosOperacionales - impuestos;

  const data = [
    {
      name: 'Ingresos',
      value: ingresosTotales,
      fill: '#10b981'
    },
    {
      name: 'Costos',
      value: -costos,
      fill: '#ef4444'
    },
    {
      name: 'Gastos Op.',
      value: -gastosOperacionales,
      fill: '#f97316'
    },
    {
      name: 'Impuestos',
      value: -impuestos,
      fill: '#f59e0b'
    },
    {
      name: 'Ganancia Neta',
      value: gananciaNet,
      fill: '#06b6d4'
    }
  ];

  // Para el waterfall visual
  const waterfallData = data.map((item, idx) => {
    let cumulative = 0;
    for (let i = 0; i <= idx; i++) {
      cumulative += data[i].value;
    }
    
    return {
      name: item.name,
      value: Math.abs(item.value),
      pv: item.value > 0 ? 0 : cumulative - Math.abs(item.value),
      fill: item.fill,
      isPositive: item.value > 0
    };
  });

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Análisis de Ganancia
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Desglose del flujo desde ingresos hasta ganancia neta
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={waterfallData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={100}
            stroke="#9ca3af"
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <YAxis
            stroke="#9ca3af"
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #4b5563',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value) => `$${value.toLocaleString('es-CL')}`}
            labelFormatter={(label) => label}
          />
          <Bar dataKey="value" fill="#8884d8" radius={[8, 8, 0, 0]}>
            {waterfallData.map((entry, index) => (
              <CellComponent key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Tabla de detalles */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">
            Ingresos Totales
          </p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            ${(ingresosTotales / 1000000).toFixed(2)}M
          </p>
          <p className="text-xs text-green-600 dark:text-green-500 mt-1">
            +100% (base)
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-xs font-medium text-red-700 dark:text-red-400 mb-1">
            Costos
          </p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            -${(costos / 1000000).toFixed(2)}M
          </p>
          <p className="text-xs text-red-600 dark:text-red-500 mt-1">
            -{((costos / ingresosTotales) * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <p className="text-xs font-medium text-orange-700 dark:text-orange-400 mb-1">
            Gastos Op.
          </p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            -${(gastosOperacionales / 1000000).toFixed(2)}M
          </p>
          <p className="text-xs text-orange-600 dark:text-orange-500 mt-1">
            -{((gastosOperacionales / ingresosTotales) * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">
            Impuestos
          </p>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            -${(impuestos / 1000000).toFixed(2)}M
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">
            -{((impuestos / ingresosTotales) * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-4">
          <p className="text-xs font-medium text-cyan-700 dark:text-cyan-400 mb-1">
            Ganancia Neta
          </p>
          <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
            ${(gananciaNet / 1000000).toFixed(2)}M
          </p>
          <p className="text-xs text-cyan-600 dark:text-cyan-500 mt-1">
            {((gananciaNet / ingresosTotales) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Resumen */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-900 dark:text-blue-300">
          <span className="font-semibold">Margen Neto: </span>
          {((gananciaNet / ingresosTotales) * 100).toFixed(1)}% | 
          <span className="font-semibold ml-3">ROI Estimado: </span>
          {((gananciaNet / (costos + gastosOperacionales)) * 100).toFixed(1)}%
        </p>
      </div>
    </div>
  );
}
