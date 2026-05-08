import * as XLSX from 'xlsx';

export const exportToExcel = (mockData, fileName = 'SAP_Dashboard.xlsx') => {
  try {
    const workbook = XLSX.utils.book_new();
    const metricasDesempeño = mockData.desempeño || mockData['desempeÃ±o'];

    const kpisData = mockData.kpis.map(kpi => ({
      'Métrica': kpi.title,
      'Valor': kpi.value,
      'Unidad': kpi.unit || '',
      'Cambio %': kpi.change,
      'Moneda': kpi.currency || ''
    }));
    const kpisSheet = XLSX.utils.json_to_sheet(kpisData);
    XLSX.utils.book_append_sheet(workbook, kpisSheet, 'KPIs');

    const ventasSheet = XLSX.utils.json_to_sheet(mockData.ventasPorRegion);
    XLSX.utils.book_append_sheet(workbook, ventasSheet, 'Ventas Región');

    const productosData = mockData.productosTop.map((p, idx) => ({
      'Ranking': idx + 1,
      'Producto': p.nombre,
      'ID': p.id,
      'Ventas': p.ventas,
      'Cantidad': p.cantidad
    }));
    const productosSheet = XLSX.utils.json_to_sheet(productosData);
    XLSX.utils.book_append_sheet(workbook, productosSheet, 'Top Productos');

    const tendenciasSheet = XLSX.utils.json_to_sheet(mockData.tendenciasMensual);
    XLSX.utils.book_append_sheet(workbook, tendenciasSheet, 'Tendencia Mensual');

    const inventarioSheet = XLSX.utils.json_to_sheet(mockData.inventarioPorCategoria);
    XLSX.utils.book_append_sheet(workbook, inventarioSheet, 'Inventario');

    const clientesSheet = XLSX.utils.json_to_sheet(mockData.clientesPorIndustria);
    XLSX.utils.book_append_sheet(workbook, clientesSheet, 'Clientes Industria');

    const resumenData = [
      { 'Métrica': 'Ventas del Mes', 'Valor': mockData.kpis[0]?.value || 0 },
      { 'Métrica': 'Ventas Acumuladas Año', 'Valor': mockData.kpis[1]?.value || 0 },
      { 'Métrica': 'Margen Bruto Mensual', 'Valor': mockData.kpis[2]?.value || 0 },
      { 'Métrica': 'Órdenes de Venta Abiertas', 'Valor': mockData.kpis[3]?.value || 0 },
      { 'Métrica': 'Cuentas por Cobrar Vencidas', 'Valor': mockData.kpis[4]?.value || 0 },
      { 'Métrica': 'Stock Disponible Total', 'Valor': mockData.kpis[5]?.value || 0 },
      { 'Métrica': 'Productos Bajo Mínimo', 'Valor': mockData.kpis[6]?.value || 0 },
      { 'Métrica': 'Satisfacción Cliente', 'Valor': metricasDesempeño.satisfaccionCliente },
      { 'Métrica': 'Tiempo Entrega (días)', 'Valor': metricasDesempeño.tiempoEntrega },
      { 'Métrica': 'Tasa Devolución %', 'Valor': metricasDesempeño.tasaDevolucion },
      { 'Métrica': 'Eficiencia Operacional %', 'Valor': metricasDesempeño.eficienciaOperacional }
    ];
    const resumenSheet = XLSX.utils.json_to_sheet(resumenData);
    XLSX.utils.book_append_sheet(workbook, resumenSheet, 'Resumen Ejecutivo');

    const setColWidth = (sheet) => {
      const colWidth = 20;
      const cols = Array.from({ length: 10 }, () => ({ wch: colWidth }));
      sheet['!cols'] = cols;
    };

    Object.keys(workbook.Sheets).forEach(sheetName => {
      setColWidth(workbook.Sheets[sheetName]);
    });

    XLSX.writeFile(workbook, fileName);
  } catch (error) {
    console.error('Error al exportar Excel:', error);
    alert('Error al generar el Excel. Intenta nuevamente.');
  }
};

export const exportTableToExcel = (data, fileName = 'export.xlsx') => {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
    XLSX.writeFile(workbook, fileName);
  } catch (error) {
    console.error('Error al exportar:', error);
    alert('Error al generar el Excel. Intenta nuevamente.');
  }
};
