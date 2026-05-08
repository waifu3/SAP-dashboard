// src/components/modules/ModuloVentas.jsx
import VentasRegional from '../VentasRegional';
import TendenciaVentas from '../TendenciaVentas';
import GraficoScatter from '../GraficoScatter';

export default function ModuloVentas({ mockData }) {
  return (
    <div className="space-y-6">
      {/* Header del módulo */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-2">
          📊 Módulo de Ventas
        </h2>
        <p className="text-blue-800 dark:text-blue-400">
          Análisis completo de ventas por región, tendencias y correlaciones
        </p>
      </div>

      {/* KPIs de Ventas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Ingresos Totales</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            ${(mockData.kpis[0]?.value / 1000000).toFixed(2)}M
          </p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            ↑ {mockData.kpis[0]?.change}% este mes
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Total de Órdenes</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {mockData.kpis[1]?.value.toLocaleString('es-CL')}
          </p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            ↑ {mockData.kpis[1]?.change}% este mes
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Ticket Promedio</p>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            ${(mockData.kpis[0].value / mockData.kpis[1].value).toLocaleString('es-CL', { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Por orden</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VentasRegional datos={mockData.ventasPorRegion} />
        <GraficoScatter productos={mockData.productosTop} />
      </div>

      {/* Tendencia */}
      <div>
        <TendenciaVentas datos={mockData.tendenciasMensual} />
      </div>
    </div>
  );
}
