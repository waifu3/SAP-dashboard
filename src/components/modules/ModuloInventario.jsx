// src/components/modules/ModuloInventario.jsx
import React from 'react';
import GraficoDistribucion from '../GraficoDistribucion';
import EstadoInventario from '../EstadoInventario';

export default function ModuloInventario({ mockData }) {
  const totalInventario = mockData.inventarioPorCategoria.reduce((sum, item) => sum + item.disponible, 0);
  const totalMinimo = mockData.inventarioPorCategoria.reduce((sum, item) => sum + item.minimo, 0);
  const calidadInventario = ((totalInventario / (totalInventario + totalMinimo)) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header del módulo */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-green-900 dark:text-green-300 mb-2">
          📦 Módulo de Inventario
        </h2>
        <p className="text-green-800 dark:text-green-400">
          Gestión y distribución de inventario por categoría
        </p>
      </div>

      {/* KPIs de Inventario */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Total en Stock</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {totalInventario.toLocaleString('es-CL')}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">unidades</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Stock Mínimo</p>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
            {totalMinimo.toLocaleString('es-CL')}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">unidades</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Calidad Stock</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {calidadInventario}%
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">disponibilidad</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GraficoDistribucion datos={mockData.inventarioPorCategoria} />
        <EstadoInventario datos={mockData.inventarioPorCategoria} />
      </div>
    </div>
  );
}
