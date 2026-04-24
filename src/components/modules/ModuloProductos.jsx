// src/components/modules/ModuloProductos.jsx
import React from 'react';
import ProductosTop from '../ProductosTop';
import GraficoScatter from '../GraficoScatter';

export default function ModuloProductos({ mockData }) {
  const topProducto = mockData.productosTop[0];
  const totalVentas = mockData.productosTop.reduce((sum, p) => sum + p.ventas, 0);
  const topProductoPorcentaje = ((topProducto.ventas / totalVentas) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header del módulo */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-300 mb-2">
          🛍️ Módulo de Productos
        </h2>
        <p className="text-amber-800 dark:text-amber-400">
          Análisis de desempeño de productos y mix de ventas
        </p>
      </div>

      {/* KPIs de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Productos en Catálogo</p>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
            {mockData.productosTop.length}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">SKUs activos</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Producto Estrella</p>
          <p className="text-xl font-bold text-green-600 dark:text-green-400">
            {topProducto.nombre}
          </p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            {topProductoPorcentaje}% del total
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Promedio Ganancia</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            ${(mockData.productosTop.reduce((sum, p) => sum + p.ganancia, 0) / mockData.productosTop.length / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">por producto</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 gap-6">
        {/* Scatter - Correlación */}
        <GraficoScatter productos={mockData.productosTop} />

        {/* Top Productos */}
        <ProductosTop datos={mockData.productosTop} />
      </div>

      {/* Análisis de Mix */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Análisis de Mix de Productos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded p-4">
            <p className="text-sm font-medium text-amber-900 dark:text-amber-300 mb-2">Concentración</p>
            <p className="text-xs text-amber-800 dark:text-amber-400">
              Top 3 productos representan {((mockData.productosTop.slice(0, 3).reduce((sum, p) => sum + p.ventas, 0) / totalVentas) * 100).toFixed(1)}% de las ventas. Nivel de concentración moderado.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded p-4">
            <p className="text-sm font-medium text-green-900 dark:text-green-300 mb-2">Oportunidad</p>
            <p className="text-xs text-green-800 dark:text-green-400">
              Existe potencial para desarrollar productos con menor cuota de mercado. Diversificar portafolio reduce riesgo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
