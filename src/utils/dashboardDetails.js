const formatCurrency = (value) => `$${((Number(value) || 0) / 1000000).toFixed(1)}M`;

const formatNumber = (value) => (Number(value) || 0).toLocaleString('es-CL');

const kpiModuleMap = {
  1: 'ventas',
  2: 'ventas',
  3: 'finanzas',
  4: 'ventas',
  5: 'finanzas',
  6: 'inventario',
  7: 'inventario',
  8: 'productos',
};

const getKpiRows = (kpi, data) => {
  if ([1, 2].includes(kpi.id)) {
    return (data.ventasPorRegion || []).map((item) => ({
      label: item.region,
      value: formatCurrency(item.ventas),
      meta: `Objetivo ${formatCurrency(item.target)}`,
    }));
  }

  if (kpi.id === 3 || kpi.id === 5) {
    return [
      { label: 'Ventas filtradas', value: formatCurrency(data._filters?.currentSales), meta: 'Base del periodo' },
      { label: 'Presupuesto filtrado', value: formatCurrency(data._filters?.currentBudget), meta: 'Meta del periodo' },
      { label: 'Margen filtrado', value: `${data._filters?.margin || 0}%`, meta: 'Ganancia / ventas' },
    ];
  }

  if ([6, 7].includes(kpi.id)) {
    return (data.inventarioPorCategoria || []).map((item) => ({
      label: item.categoria,
      value: formatNumber(item.disponible),
      meta: `Minimo ${formatNumber(item.minimo)} - ${item.estado}`,
    }));
  }

  if (kpi.id === 8) {
    return (data.productosTop || []).slice(0, 5).map((item) => ({
      label: item.nombre,
      value: formatCurrency(item.ventas),
      meta: `${formatNumber(item.cantidad)} unidades`,
    }));
  }

  return (data.ordenesRecientes || []).slice(0, 5).map((item) => ({
    label: item.id,
    value: formatCurrency(item.monto),
    meta: `${item.cliente} - ${item.estado}`,
  }));
};

export const getKpiDetail = (kpi, data) => ({
  type: 'KPI',
  title: kpi.title,
  subtitle: `Vista filtrada por ${data._filters?.regionLabel || 'todas las regiones'}`,
  status: kpi.change >= 0 ? 'Tendencia positiva' : 'Tendencia a revisar',
  description:
    kpi.change >= 0
      ? `El indicador presenta una variacion positiva de ${Math.abs(kpi.change)}% respecto al periodo comparable.`
      : `El indicador cae ${Math.abs(kpi.change)}% respecto al periodo comparable. Conviene revisar causas y responsables.`,
  moduleId: kpiModuleMap[kpi.id] || 'ventas',
  metrics: [
    { label: 'Valor actual', value: kpi.currency ? formatCurrency(kpi.value) : `${formatNumber(kpi.value)}${kpi.unit ? ` ${kpi.unit}` : ''}` },
    { label: 'Cambio', value: `${kpi.change > 0 ? '+' : ''}${kpi.change}%` },
    { label: 'Region', value: data._filters?.regionLabel || 'Todas' },
  ],
  rows: getKpiRows(kpi, data),
  actions: [
    'Abrir modulo relacionado',
    'Exportar vista filtrada',
    'Comparar con periodo anterior',
  ],
});

export const getAlertDetail = (alert, data) => {
  const stockRows = (data.inventarioPorCategoria || [])
    .filter((item) => alert.id.includes(item.categoria) || item.estado !== 'Optimo')
    .map((item) => ({
      label: item.categoria,
      value: formatNumber(item.disponible),
      meta: `Minimo ${formatNumber(item.minimo)} - rotacion ${item.rotacion}`,
    }));

  const salesRows = (data.ventasPorRegion || []).map((item) => ({
    label: item.region,
    value: formatCurrency(item.ventas),
    meta: `Brecha ${formatCurrency(item.ventas - item.target)}`,
  }));

  const orderRows = (data.ordenesRecientes || []).slice(0, 5).map((item) => ({
    label: item.id,
    value: formatCurrency(item.monto),
    meta: `${item.cliente} - ${item.estado}`,
  }));

  const isStock = alert.id.startsWith('stock-');
  const isSales = alert.id === 'sales-target';
  const isOrders = alert.id === 'open-orders';

  return {
    type: 'Alerta',
    title: alert.title,
    subtitle: alert.action,
    status: alert.severity === 'critical' ? 'Critica' : alert.severity === 'warning' ? 'Preventiva' : 'Informativa',
    description: alert.description,
    moduleId: isStock ? 'inventario' : isSales || isOrders ? 'ventas' : 'finanzas',
    metrics: [
      { label: 'Region', value: data._filters?.regionLabel || 'Todas' },
      { label: 'Periodo', value: data._filters?.periodo || 'mes' },
      { label: 'Severidad', value: alert.severity },
    ],
    rows: isStock ? stockRows : isOrders ? orderRows : salesRows,
    actions: isStock
      ? ['Crear solicitud de compra', 'Revisar rotacion', 'Validar stock comprometido']
      : isSales
      ? ['Revisar pipeline', 'Contactar cuentas clave', 'Ajustar forecast']
      : ['Priorizar cobranza', 'Revisar antiguedad de deuda', 'Escalar cuentas criticas'],
  };
};
