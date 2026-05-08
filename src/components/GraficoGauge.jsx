// src/components/GraficoGauge.jsx
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function GraficoGauge({ valor, maximo = 100, titulo, unidad = '%' }) {
  // Normalizar el valor entre 0 y 100
  const porcentaje = Math.min((valor / maximo) * 100, 100);

  // Determinar color según rango
  let color, textColor, bgColor;
  if (porcentaje >= 80) {
    color = '#10b981'; // Verde
    textColor = 'text-green-600';
    bgColor = 'bg-green-50';
  } else if (porcentaje >= 60) {
    color = '#f59e0b'; // Naranja
    textColor = 'text-yellow-600';
    bgColor = 'bg-yellow-50';
  } else {
    color = '#ef4444'; // Rojo
    textColor = 'text-red-600';
    bgColor = 'bg-red-50';
  }

  const data = [
    { name: 'Cumplimiento', value: porcentaje, fill: color },
    { name: 'Restante', value: 100 - porcentaje, fill: '#e5e7eb' }
  ];

  return (
    <div className={`${bgColor} dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {titulo}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        {/* Gauge */}
        <div className="flex justify-center">
          <div className="relative w-40 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className={`text-4xl font-bold ${textColor}`}>
                {porcentaje.toFixed(1)}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{unidad}</p>
            </div>
          </div>
        </div>

        {/* Información */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Valor Actual</p>
            <p className={`text-3xl font-bold ${textColor}`}>
              {valor.toLocaleString('es-CL')}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Meta</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {maximo.toLocaleString('es-CL')}
            </p>
          </div>

          {/* Barra de progreso */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Progreso</p>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">
                {porcentaje.toFixed(0)}%
              </p>
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${porcentaje}%`,
                  backgroundColor: color
                }}
              ></div>
            </div>
          </div>

          {/* Estado */}
          <div className={`p-3 rounded-lg text-center ${bgColor} dark:bg-gray-600`}>
            <p className={`text-sm font-semibold ${textColor}`}>
              {porcentaje >= 80
                ? '✓ Cumplimiento Óptimo'
                : porcentaje >= 60
                ? '⚠ Cumplimiento Aceptable'
                : '✗ Bajo Cumplimiento'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
