// src/utils/exportExcel.js
import * as XLSX from 'xlsx';

export const exportToExcel = (mockData, fileName = 'SAP_Dashboard.xlsx') => {
  try {
    // Crear un nuevo libro de Excel
    const workbook = XLSX.utils.book_new();

    // Sheet 1: KPIs
    const kpisData = mockData.kpis.map(kpi => ({
      'Métrica': kpi.title,
      'Valor': kpi.value,
      'Unidad': kpi.unit || '',
      'Cambio %': kpi.change,
      'Moneda': kpi.currency || ''
    }));
    const kpisSheet = XLSX.utils.json_to_sheet(kpisData);
    XLSX.utils.book_append_sheet(workbook, kpisSheet, 'KPIs');

    // Sheet 2: Ventas por Región
    const ventasSheet = XLSX.utils.json_to_sheet(mockData.ventasPorRegion);
    XLSX.utils.book_append_sheet(workbook, ventasSheet, 'Ventas Región');

    // Sheet 3: Top Productos
    const productosData = mockData.productosTop.map((p, idx) => ({
      'Ranking': idx + 1,
      'Producto': p.nombre,
      'ID': p.id,
      'Ventas': p.ventas,
      'Cantidad': p.cantidad
    }));
    const productosSheet = XLSX.utils.json_to_sheet(productosData);
    XLSX.utils.book_append_sheet(workbook, productosSheet, 'Top Productos');

    // Sheet 4: Tendencia Mensual
    const tendenciasSheet = XLSX.utils.json_to_sheet(mockData.tendenciasMensual);
    XLSX.utils.book_append_sheet(workbook, tendenciasSheet, 'Tendencia Mensual');

    // Sheet 5: Inventario
    const inventarioSheet = XLSX.utils.json_to_sheet(mockData.inventarioPorCategoria);
    XLSX.utils.book_append_sheet(workbook, inventarioSheet, 'Inventario');

    // Sheet 6: Clientes por Industria
    const clientesSheet = XLSX.utils.json_to_sheet(mockData.clientesPorIndustria);
    XLSX.utils.book_append_sheet(workbook, clientesSheet, 'Clientes Industria');

    // Sheet 7: Resumen Ejecutivo
    const resumenData = [
      {
        'Métrica': 'Ingresos Totales',
        'Valor': mockData.kpis[0]?.value || 0
      },
      {
        'Métrica': 'Total de Órdenes',
        'Valor': mockData.kpis[1]?.value || 0
      },
      {
        'Métrica': 'Clientes Activos',
        'Valor': mockData.kpis[2]?.value || 0
      },
      {
        'Métrica': 'Margen Operacional',
        'Valor': mockData.kpis[3]?.value || 0
      },
      {
        'Métrica': 'Satisfacción Cliente',
        'Valor': mockData.desempeño.satisfaccionCliente
      },
      {
        'Métrica': 'Tiempo Entrega (días)',
        'Valor': mockData.desempeño.tiempoEntrega
      },
      {
        'Métrica': 'Tasa Devolución %',
        'Valor': mockData.desempeño.tasaDevolucion
      },
      {
        'Métrica': 'Eficiencia Operacional %',
        'Valor': mockData.desempeño.eficienciaOperacional
      }
    ];
    const resumenSheet = XLSX.utils.json_to_sheet(resumenData);
    XLSX.utils.book_append_sheet(workbook, resumenSheet, 'Resumen Ejecutivo');

    // Establecer ancho de columnas
    const setColWidth = (sheet) => {
      const colWidth = 20;
      const cols = Array.from({ length: 10 }, () => ({ wch: colWidth }));
      sheet['!cols'] = cols;
    };

    Object.keys(workbook.Sheets).forEach(sheetName => {
      setColWidth(workbook.Sheets[sheetName]);
    });

    // Descargar Excel
    XLSX.writeFile(workbook, fileName);
  } catch (error) {
    console.error('Error al exportar Excel:', error);
    alert('Error al generar el Excel. Intenta nuevamente.');
  }
};

// Exportación rápida de tabla específica
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
