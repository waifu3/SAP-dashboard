import jsPDF from 'jspdf';

export const exportDashboardToPDF = (mockData) => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    let yPos = 15;

    // Título
    pdf.setFontSize(18);
    pdf.setFont(undefined, 'bold');
    pdf.text('SAP Dashboard Report', 105, yPos, { align: 'center' });
    yPos += 12;

    // Fecha
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Generado: ${new Date().toLocaleDateString('es-CL')} a las ${new Date().toLocaleTimeString('es-CL')}`, 105, yPos, { align: 'center' });
    yPos += 12;

    // KPIs Principales
    pdf.setFontSize(13);
    pdf.setFont(undefined, 'bold');
    pdf.text('KPIs Principales', 15, yPos);
    yPos += 8;

    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    mockData.kpis.forEach((kpi) => {
      const text = `${kpi.title}: ${kpi.value.toLocaleString('es-CL')} ${kpi.unit || ''} (${kpi.change > 0 ? '+' : ''}${kpi.change}%)`;
      pdf.text(text, 20, yPos);
      yPos += 6;
      
      if (yPos > 270) {
        pdf.addPage();
        yPos = 15;
      }
    });

    yPos += 5;

    // Ventas por Región
    pdf.setFontSize(13);
    pdf.setFont(undefined, 'bold');
    pdf.text('Ventas por Región', 15, yPos);
    yPos += 8;

    pdf.setFontSize(9);
    pdf.setFont(undefined, 'normal');
    mockData.ventasPorRegion.forEach((region) => {
      const text = `${region.region}: $${(region.ventas / 1000).toFixed(0)}K (Target: $${(region.target / 1000).toFixed(0)}K)`;
      pdf.text(text, 20, yPos);
      yPos += 5;
    });

    yPos += 5;

    // Top 5 Productos
    pdf.setFontSize(13);
    pdf.setFont(undefined, 'bold');
    pdf.text('Top 5 Productos', 15, yPos);
    yPos += 8;

    pdf.setFontSize(9);
    pdf.setFont(undefined, 'normal');
    mockData.productosTop.slice(0, 5).forEach((producto, idx) => {
      const text = `${idx + 1}. ${producto.nombre}: $${(producto.ventas / 1000000).toFixed(1)}M (${producto.cantidad} unidades)`;
      pdf.text(text, 20, yPos);
      yPos += 5;
    });

    // Nueva página
    pdf.addPage();
    yPos = 15;

    // Tendencia Mensual
    pdf.setFontSize(13);
    pdf.setFont(undefined, 'bold');
    pdf.text('Tendencia Mensual (Últimos 12 Meses)', 15, yPos);
    yPos += 8;

    pdf.setFontSize(8);
    pdf.setFont(undefined, 'normal');
    pdf.text('Mes | Ventas | Presupuesto | Ganancia', 15, yPos);
    yPos += 5;
    pdf.setDrawColor(200);
    pdf.line(15, yPos - 2, 195, yPos - 2);
    
    mockData.tendenciasMensual.forEach((mes) => {
      const text = `${mes.mes} | $${(mes.ventas / 1000).toFixed(0)}K | $${(mes.presupuesto / 1000).toFixed(0)}K | $${(mes.ganancia / 1000).toFixed(0)}K`;
      pdf.text(text, 15, yPos);
      yPos += 4;
      
      if (yPos > 270) {
        pdf.addPage();
        yPos = 15;
      }
    });

    yPos += 8;

    // Resumen Ejecutivo
    pdf.setFontSize(13);
    pdf.setFont(undefined, 'bold');
    pdf.text('Resumen Ejecutivo', 15, yPos);
    yPos += 8;

    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    const metrics = [
      `Satisfacción del Cliente: ${mockData.desempeño.satisfaccionCliente} ⭐`,
      `Tiempo de Entrega Promedio: ${mockData.desempeño.tiempoEntrega} días`,
      `Tasa de Devolución: ${mockData.desempeño.tasaDevolucion}%`,
      `Eficiencia Operacional: ${mockData.desempeño.eficienciaOperacional}%`
    ];

    metrics.forEach((metric) => {
      pdf.text(metric, 20, yPos);
      yPos += 6;
    });

    // Pie de página
    pdf.setFontSize(8);
    pdf.setTextColor(128);
    pdf.text('SAP Dashboard © 2024', 105, 285, { align: 'center' });

    // Guardar PDF
    pdf.save('SAP_Dashboard_Report.pdf');
  } catch (error) {
    console.error('Error al exportar PDF:', error);
    alert('Error al generar el PDF. Intenta nuevamente.');
  }
};