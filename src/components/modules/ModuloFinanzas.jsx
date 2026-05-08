// src/components/modules/ModuloFinanzas.jsx
import GraficoWaterfall from '../GraficoWaterfall';
import GraficoGauge from '../GraficoGauge';

export default function ModuloFinanzas({ mockData }) {
  const margenOperacional = mockData.kpis[3]?.value || 32.5;

  return (
    <div className="space-y-6">
      {/* Header del módulo */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-300 mb-2">
          💰 Módulo de Finanzas
        </h2>
        <p className="text-purple-800 dark:text-purple-400">
          Análisis financiero, márgenes y rentabilidad
        </p>
      </div>

      {/* KPIs Financieros */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Margen Operacional</p>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {margenOperacional}%
          </p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">✓ Saludable</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Ingresos Totales</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            ${(mockData.kpis[0]?.value / 1000000).toFixed(2)}M
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">este período</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">ROI Estimado</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {(margenOperacional * 1.8).toFixed(1)}%
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">proyectado</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Eficiencia Costos</p>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
            {(100 - (margenOperacional / 2)).toFixed(1)}%
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">control</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waterfall */}
        <div className="lg:col-span-2">
          <GraficoWaterfall mockData={mockData} />
        </div>

        {/* Gauges */}
        <GraficoGauge 
          valor={margenOperacional} 
          maximo={50}
          titulo="Margen Operacional"
          unidad="%"
        />
        <GraficoGauge 
          valor={mockData.desempeño.eficienciaOperacional} 
          maximo={100}
          titulo="Eficiencia Operacional"
          unidad="%"
        />
      </div>

      {/* Análisis detallado */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Resumen Financiero
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded p-4">
            <p className="text-sm font-medium text-green-900 dark:text-green-300 mb-2">Ingresos vs Costo</p>
            <p className="text-xs text-green-800 dark:text-green-400">
              La relación entre ingresos y costos es saludable. Se mantiene un margen operacional superior al 30%.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-4">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Proyección</p>
            <p className="text-xs text-blue-800 dark:text-blue-400">
              Basado en tendencias actuales, se proyecta un incremento del 8-12% en rentabilidad para próximos trimestres.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
