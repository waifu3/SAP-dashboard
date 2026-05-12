const periodConfig = {
  semana: { months: 1, factor: 0.25, label: 'Semana actual' },
  mes: { months: 1, factor: 1, label: 'Mes actual' },
  trimestre: { months: 3, factor: 1, label: 'Trimestre actual' },
  anio: { months: 12, factor: 1, label: 'Año actual' },
};

const normalize = (value) =>
  value
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const sumBy = (items, key) => items.reduce((total, item) => total + (Number(item[key]) || 0), 0);

const getTrendWindow = (trends, period) => {
  const config = periodConfig[period] || periodConfig.mes;
  const selected = trends.slice(-config.months);
  const previous = trends.slice(Math.max(0, trends.length - config.months * 2), trends.length - config.months);

  if (period === 'semana') {
    return {
      selected: selected.map((item) => ({
        ...item,
        mes: config.label,
        ventas: Math.round(item.ventas * config.factor),
        presupuesto: Math.round(item.presupuesto * config.factor),
        ganancia: Math.round(item.ganancia * config.factor),
      })),
      previous: previous.map((item) => ({
        ...item,
        ventas: Math.round(item.ventas * config.factor),
        presupuesto: Math.round(item.presupuesto * config.factor),
        ganancia: Math.round(item.ganancia * config.factor),
      })),
    };
  }

  return { selected, previous };
};

const getChange = (current, previous) => {
  if (!previous) return 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
};

export const getFilteredDashboardData = (data, { periodo, filtroRegion }) => {
  const trends = data.tendenciasMensual || [];
  const regions = data.ventasPorRegion || [];
  const selectedRegion =
    filtroRegion === 'todas'
      ? null
      : regions.find((item) => normalize(item.region) === normalize(filtroRegion));
  const regionTotal = sumBy(regions, 'ventas') || 1;
  const regionRatio = selectedRegion ? selectedRegion.ventas / regionTotal : 1;
  const ventasPorRegion = selectedRegion ? [selectedRegion] : regions;
  const { selected, previous } = getTrendWindow(trends, periodo);

  const currentSales = Math.round(sumBy(selected, 'ventas') * regionRatio);
  const previousSales = Math.round(sumBy(previous, 'ventas') * regionRatio);
  const currentBudget = Math.round(sumBy(selected, 'presupuesto') * regionRatio);
  const currentProfit = Math.round(sumBy(selected, 'ganancia') * regionRatio);
  const margin = currentSales ? Number(((currentProfit / currentSales) * 100).toFixed(1)) : 0;
  const targetGap = currentBudget ? Number((((currentSales - currentBudget) / currentBudget) * 100).toFixed(1)) : 0;
  const periodFactor = periodo === 'semana' ? 0.25 : periodo === 'trimestre' ? 3 : periodo === 'anio' ? 12 : 1;

  const kpis = data.kpis.map((kpi, index) => {
    if (index === 0) {
      return {
        ...kpi,
        title: periodo === 'anio' ? 'Ventas del Año' : periodo === 'trimestre' ? 'Ventas del Trimestre' : periodo === 'semana' ? 'Ventas de la Semana' : 'Ventas del Mes',
        value: currentSales,
        change: getChange(currentSales, previousSales),
      };
    }

    if (index === 1) {
      return {
        ...kpi,
        title: 'Ventas acumuladas filtradas',
        value: Math.round(sumBy(trends, 'ventas') * regionRatio),
        change: getChange(currentSales, previousSales),
      };
    }

    if (index === 2) {
      return {
        ...kpi,
        title: 'Margen bruto filtrado',
        value: margin,
        change: Number((margin - (kpi.value || margin)).toFixed(1)),
      };
    }

    if (index === 3) {
      return {
        ...kpi,
        value: Math.max(1, Math.round(kpi.value * regionRatio * Math.min(periodFactor, 4))),
      };
    }

    if (index === 4) {
      return {
        ...kpi,
        value: Math.round(kpi.value * regionRatio),
      };
    }

    return kpi;
  });

  const tendenciasMensual = selected.map((item) => ({
    ...item,
    ventas: Math.round(item.ventas * regionRatio),
    presupuesto: Math.round(item.presupuesto * regionRatio),
    ganancia: Math.round(item.ganancia * regionRatio),
  }));

  const productosTop = data.productosTop.map((item) => ({
    ...item,
    ventas: Math.round(item.ventas * regionRatio),
    ganancia: item.ganancia ?? Math.round(item.ventas * 0.28 * regionRatio),
  }));

  return {
    ...data,
    kpis,
    ventasPorRegion,
    tendenciasMensual,
    productosTop,
    _filters: {
      periodo,
      filtroRegion,
      regionLabel: selectedRegion?.region || 'Todas las regiones',
      currentSales,
      currentBudget,
      targetGap,
      margin,
    },
  };
};

export const getExecutiveAlerts = (data) => {
  const filters = data._filters || {};
  const inventoryAlerts = (data.inventarioPorCategoria || [])
    .filter((item) => normalize(item.estado || '') !== 'optimo' || item.disponible <= item.minimo)
    .map((item) => {
      const estado = item.estado || 'Bajo';
      return {
        id: `stock-${item.categoria}`,
        severity: normalize(estado) === 'critico' || item.disponible <= item.minimo ? 'critical' : 'warning',
        title: `Stock ${estado.toLowerCase()} en ${item.categoria}`,
        description: `${item.disponible.toLocaleString('es-CL')} unidades disponibles. Mínimo: ${item.minimo.toLocaleString('es-CL')}.`,
        action: 'Revisar reposición',
      };
    });

  const salesAlert =
    filters.currentBudget && filters.currentSales < filters.currentBudget
      ? [{
          id: 'sales-target',
          severity: 'warning',
          title: `${filters.regionLabel} bajo objetivo`,
          description: `Ventas ${(Math.abs(filters.targetGap)).toFixed(1)}% bajo presupuesto para el periodo seleccionado.`,
          action: 'Revisar pipeline',
        }]
      : [];

  const receivables = data.kpis[4]?.value || 0;
  const receivablesAlert =
    receivables > 0
      ? [{
          id: 'receivables',
          severity: receivables > 40000000 ? 'critical' : 'warning',
          title: 'Cuentas por cobrar vencidas',
          description: `$${(receivables / 1000000).toFixed(1)}M requieren seguimiento de cobranza.`,
          action: 'Priorizar cobranza',
        }]
      : [];

  const openOrders = data.kpis[3]?.value || 0;
  const ordersAlert =
    openOrders > 40
      ? [{
          id: 'open-orders',
          severity: 'info',
          title: 'Órdenes abiertas acumuladas',
          description: `${openOrders.toLocaleString('es-CL')} órdenes abiertas en el contexto filtrado.`,
          action: 'Acelerar preparación',
        }]
      : [];

  return [...salesAlert, ...receivablesAlert, ...inventoryAlerts, ...ordersAlert].slice(0, 5);
};

export const getExecutiveSummary = (data, alerts) => {
  const filters = data._filters || {};
  const receivables = data.kpis[4]?.value || 0;
  const openOrders = data.kpis[3]?.value || 0;
  const inventoryItems = data.inventarioPorCategoria || [];
  const stockRisk = inventoryItems.filter((item) => normalize(item.estado || '') !== 'optimo').length;
  const criticalAlerts = alerts.filter((alert) => alert.severity === 'critical').length;
  const topProduct = data.productosTop?.[0];
  const salesVsBudget =
    filters.currentBudget && filters.currentSales
      ? Number(((filters.currentSales / filters.currentBudget) * 100).toFixed(1))
      : 0;

  const status =
    criticalAlerts > 0
      ? 'Atención requerida'
      : salesVsBudget >= 100 && stockRisk === 0
      ? 'Operación saludable'
      : 'Seguimiento recomendado';

  const narrative =
    salesVsBudget >= 100
      ? `${filters.regionLabel} supera el presupuesto del periodo con ${salesVsBudget}% de cumplimiento.`
      : `${filters.regionLabel} alcanza ${salesVsBudget}% del presupuesto del periodo seleccionado.`;

  return {
    status,
    narrative,
    points: [
      {
        label: 'Cumplimiento ventas',
        value: `${salesVsBudget || 0}%`,
        tone: salesVsBudget >= 100 ? 'positive' : 'warning',
      },
      {
        label: 'Cobranza vencida',
        value: `$${(receivables / 1000000).toFixed(1)}M`,
        tone: receivables > 40000000 ? 'critical' : 'warning',
      },
      {
        label: 'Stock con riesgo',
        value: stockRisk.toString(),
        tone: stockRisk > 0 ? 'critical' : 'positive',
      },
      {
        label: 'Órdenes abiertas',
        value: openOrders.toLocaleString('es-CL'),
        tone: openOrders > 40 ? 'warning' : 'positive',
      },
    ],
    recommendation:
      criticalAlerts > 0
        ? 'Prioriza cobranza y reposición antes de ampliar compromisos comerciales.'
        : topProduct
        ? `Mantén foco comercial en ${topProduct.nombre}, el producto con mayor venta del periodo.`
        : 'Mantén monitoreo operativo con los filtros actuales.',
  };
};
