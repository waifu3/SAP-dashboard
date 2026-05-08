export const mockData = {
  kpis: [
    { id: 1, title: "Ventas del Mes", value: 284560000, currency: "CLP", change: 12.5, icon: "TrendingUp", color: "blue" },
    { id: 2, title: "Ventas Acumuladas Año", value: 2458900000, currency: "CLP", change: 9.8, icon: "BarChart3", color: "green" },
    { id: 3, title: "Margen Bruto Mensual", value: 32.5, unit: "%", change: 4.2, icon: "Percent", color: "purple" },
    { id: 4, title: "Órdenes de Venta Abiertas", value: 86, change: -3.1, icon: "ShoppingCart", color: "orange" },
    { id: 5, title: "Cuentas por Cobrar Vencidas", value: 48500000, currency: "CLP", change: -6.4, icon: "CircleDollarSign", color: "red" },
    { id: 6, title: "Stock Disponible Total", value: 5847, unit: "unidades", change: 6.8, icon: "Package", color: "cyan" },
    { id: 7, title: "Productos Bajo Mínimo", value: 18, change: 2.9, icon: "TriangleAlert", color: "amber" },
    { id: 8, title: "Top Productos por Venta", value: 10, unit: "productos", change: 0, icon: "Boxes", color: "slate" }
  ],
  ventasPorRegion: [
    { region: "Norte", ventas: 42500000, target: 40000000 },
    { region: "Central", ventas: 89000000, target: 85000000 },
    { region: "Sur", ventas: 65200000, target: 60000000 },
    { region: "Metropolitana", ventas: 67800000, target: 70000000 },
    { region: "Austral", ventas: 20060000, target: 18000000 }
  ],
  productosTop: [
    { id: "A-1001", nombre: "Fertilizante Premium 25 kg", ventas: 45000000, cantidad: 520 },
    { id: "A-1002", nombre: "Sustrato Profesional 50 L", ventas: 38000000, cantidad: 980 },
    { id: "A-1003", nombre: "Macetero Industrial 30 L", ventas: 32500000, cantidad: 670 },
    { id: "A-1004", nombre: "Bandeja Germinación 128 Cav.", ventas: 28500000, cantidad: 450 },
    { id: "A-1005", nombre: "Sistema Riego por Goteo", ventas: 24000000, cantidad: 156 },
    { id: "A-1006", nombre: "Malla Sombra 80%", ventas: 19500000, cantidad: 234 },
    { id: "A-1007", nombre: "Tierra Ácida 25 L", ventas: 16500000, cantidad: 312 },
    { id: "A-1008", nombre: "Bioestimulante Foliar", ventas: 14200000, cantidad: 89 },
    { id: "A-1009", nombre: "Invernadero Modular", ventas: 12500000, cantidad: 12 },
    { id: "A-1010", nombre: "Kit Control Plagas", ventas: 9800000, cantidad: 145 }
  ],
  tendenciasMensual: [
    { mes: "Ene", ventas: 185000000, presupuesto: 200000000, ganancia: 58500000 },
    { mes: "Feb", ventas: 201000000, presupuesto: 200000000, ganancia: 63300000 },
    { mes: "Mar", ventas: 220000000, presupuesto: 210000000, ganancia: 69000000 },
    { mes: "Abr", ventas: 198000000, presupuesto: 205000000, ganancia: 59400000 },
    { mes: "May", ventas: 235000000, presupuesto: 215000000, ganancia: 74500000 },
    { mes: "Jun", ventas: 255000000, presupuesto: 220000000, ganancia: 81000000 },
    { mes: "Jul", ventas: 268000000, presupuesto: 225000000, ganancia: 85000000 },
    { mes: "Ago", ventas: 245000000, presupuesto: 220000000, ganancia: 77500000 },
    { mes: "Sep", ventas: 278000000, presupuesto: 230000000, ganancia: 87500000 },
    { mes: "Oct", ventas: 295000000, presupuesto: 235000000, ganancia: 93500000 },
    { mes: "Nov", ventas: 312000000, presupuesto: 240000000, ganancia: 98000000 },
    { mes: "Dic", ventas: 352000000, presupuesto: 250000000, ganancia: 112000000 }
  ],
  inventarioPorCategoria: [
    { categoria: "Fertilizantes", disponible: 1245, minimo: 500, estado: "Óptimo", rotacion: "Alta" },
    { categoria: "Sustratos", disponible: 856, minimo: 300, estado: "Óptimo", rotacion: "Alta" },
    { categoria: "Maceteros", disponible: 1890, minimo: 800, estado: "Óptimo", rotacion: "Media" },
    { categoria: "Riego", disponible: 567, minimo: 200, estado: "Bajo", rotacion: "Media" },
    { categoria: "Control Plagas", disponible: 289, minimo: 150, estado: "Crítico", rotacion: "Baja" }
  ],
  clientesPorIndustria: [
    { industria: "Viveros", clientes: 145, ingresos: 89000000 },
    { industria: "Retail Jardín", clientes: 98, ingresos: 56700000 },
    { industria: "Agrícola", clientes: 67, ingresos: 75600000 },
    { industria: "Municipalidades", clientes: 45, ingresos: 34500000 },
    { industria: "Paisajismo", clientes: 56, ingresos: 28700000 }
  ],
  ordenesRecientes: [
    { id: "OV-2026-001", cliente: "Vivero Los Aromos", producto: "Fertilizante Premium 25 kg", monto: 12500000, estado: "Abierta", fecha: "2026-05-02", porcentaje: 65 },
    { id: "OV-2026-002", cliente: "Jardines del Sur", producto: "Sustrato Profesional 50 L", monto: 8500000, estado: "En Preparación", fecha: "2026-05-01", porcentaje: 75 },
    { id: "OV-2026-003", cliente: "Agro Norte", producto: "Sistema Riego por Goteo", monto: 9500000, estado: "Parcial", fecha: "2026-04-30", porcentaje: 45 },
    { id: "OV-2026-004", cliente: "Municipalidad Central", producto: "Macetero Industrial 30 L", monto: 6500000, estado: "Pendiente", fecha: "2026-04-29", porcentaje: 20 },
    { id: "OV-2026-005", cliente: "Paisajes Andinos", producto: "Malla Sombra 80%", monto: 4500000, estado: "Pendiente", fecha: "2026-04-28", porcentaje: 0 }
  ],
  desempeño: {
    satisfaccionCliente: 4.7,
    tiempoEntrega: 4.2,
    tasaDevolucion: 2.1,
    costoPorUnidad: 125000,
    eficienciaOperacional: 87.5
  }
};

export default mockData;
