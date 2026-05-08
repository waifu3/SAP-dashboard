import GraficoWaterfall from '../GraficoWaterfall';
import GraficoGauge from '../GraficoGauge';

export default function ModuloFinanzas({ mockData }) {
  const margenBruto = mockData.kpis[2]?.value || 32.5;
  const cuentasPorCobrarVencidas = mockData.kpis[4]?.value || 0;
  const metricasDesempeño = mockData.desempeño || mockData['desempeÃ±o'];

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-300 mb-2">
          Módulo de Finanzas
        </h2>
        <p className="text-purple-800 dark:text-purple-400">
          Análisis financiero, margen bruto, cuentas por cobrar y eficiencia
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Margen Bruto</p>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{margenBruto}%</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">Saludable</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Ventas del Mes</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            ${(mockData.kpis[0]?.value / 1000000).toFixed(2)}M
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">este período</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">CXC Vencidas</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            ${(cuentasPorCobrarVencidas / 1000000).toFixed(1)}M
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">saldo vencido</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Eficiencia Costos</p>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
            {(100 - (margenBruto / 2)).toFixed(1)}%
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">control</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <GraficoWaterfall mockData={mockData} />
        </div>

        <GraficoGauge valor={margenBruto} maximo={50} titulo="Margen Bruto" unidad="%" />
        <GraficoGauge
          valor={metricasDesempeño.eficienciaOperacional}
          maximo={100}
          titulo="Eficiencia Operacional"
          unidad="%"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resumen Financiero</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded p-4">
            <p className="text-sm font-medium text-green-900 dark:text-green-300 mb-2">Ventas vs Costo</p>
            <p className="text-xs text-green-800 dark:text-green-400">
              La relación entre ventas y costo es saludable. Se mantiene un margen bruto superior al 30%.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-4">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Cobranza</p>
            <p className="text-xs text-blue-800 dark:text-blue-400">
              Las cuentas por cobrar vencidas quedan visibles como KPI financiero crítico para seguimiento diario.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
