export const mockData = {
  kpis: [
    { id: 1, title: "Ingresos Totales", value: 2845600, currency: "CLP", change: 12.5, icon: "TrendingUp", color: "blue" },
    { id: 2, title: "Órdenes Completadas", value: 1234, change: 8.3, icon: "ShoppingCart", color: "green" },
    { id: 3, title: "Clientes Activos", value: 486, change: -2.1, icon: "Users", color: "purple" },
    { id: 4, title: "Margen Operacional", value: 32.5, unit: "%", change: 4.2, icon: "BarChart3", color: "orange" },
    { id: 5, title: "Inventario Disponible", value: 5847, unit: "unidades", change: 6.8, icon: "Package", color: "red" }
  ],
  ventasPorRegion: [
    { region: "Norte", ventas: 425000, target: 400000 },
    { region: "Central", ventas: 890000, target: 850000 },
    { region: "Sur", ventas: 652000, target: 600000 },
    { region: "Metropolitana", ventas: 678000, target: 700000 },
    { region: "Austral", ventas: 200600, target: 180000 }
  ],
  productosTop: [
    { id: "P001", nombre: "Software ERP Cloud", ventas: 450000, cantidad: 52 },
    { id: "P002", nombre: "Módulo HR", ventas: 380000, cantidad: 98 },
    { id: "P003", nombre: "Analytics Premium", ventas: 325000, cantidad: 67 },
    { id: "P004", nombre: "Integration Suite", ventas: 285000, cantidad: 45 },
    { id: "P005", nombre: "Security Module", ventas: 240000, cantidad: 156 },
    { id: "P006", nombre: "Reporting Tool", ventas: 195000, cantidad: 234 },
    { id: "P007", nombre: "Mobile App", ventas: 165000, cantidad: 312 },
    { id: "P008", nombre: "Data Management", ventas: 142000, cantidad: 89 },
    { id: "P009", nombre: "API Gateway", ventas: 125000, cantidad: 123 },
    { id: "P010", nombre: "Compliance Plus", ventas: 98000, cantidad: 45 }
  ],
  tendenciasMensual: [
    { mes: "Ene", ventas: 185000, presupuesto: 200000, ganancia: 58500 },
    { mes: "Feb", ventas: 201000, presupuesto: 200000, ganancia: 63300 },
    { mes: "Mar", ventas: 220000, presupuesto: 210000, ganancia: 69000 },
    { mes: "Abr", ventas: 198000, presupuesto: 205000, ganancia: 59400 },
    { mes: "May", ventas: 235000, presupuesto: 215000, ganancia: 74500 },
    { mes: "Jun", ventas: 255000, presupuesto: 220000, ganancia: 81000 },
    { mes: "Jul", ventas: 268000, presupuesto: 225000, ganancia: 85000 },
    { mes: "Ago", ventas: 245000, presupuesto: 220000, ganancia: 77500 },
    { mes: "Sep", ventas: 278000, presupuesto: 230000, ganancia: 87500 },
    { mes: "Oct", ventas: 295000, presupuesto: 235000, ganancia: 93500 },
    { mes: "Nov", ventas: 312000, presupuesto: 240000, ganancia: 98000 },
    { mes: "Dic", ventas: 352000, presupuesto: 250000, ganancia: 112000 }
  ],
  inventarioPorCategoria: [
    { categoria: "Licencias Software", disponible: 1245, minimo: 500, estado: "Óptimo", rotacion: "Alta" },
    { categoria: "Servicios Implementación", disponible: 856, minimo: 300, estado: "Óptimo", rotacion: "Alta" },
    { categoria: "Mantenimiento y Soporte", disponible: 1890, minimo: 800, estado: "Óptimo", rotacion: "Media" },
    { categoria: "Consultoría", disponible: 567, minimo: 200, estado: "Bajo", rotacion: "Media" },
    { categoria: "Capacitación", disponible: 289, minimo: 150, estado: "Crítico", rotacion: "Baja" }
  ],
  clientesPorIndustria: [
    { industria: "Manufactura", clientes: 145, ingresos: 890000 },
    { industria: "Retail", clientes: 98, ingresos: 567000 },
    { industria: "Servicios Financieros", clientes: 67, ingresos: 756000 },
    { industria: "Gobierno", clientes: 45, ingresos: 345000 },
    { industria: "Educación", clientes: 56, ingresos: 287000 }
  ],
  ordenesRecientes: [
    { id: "ORD-2024-001", cliente: "Acme Corp", producto: "Software ERP Cloud", monto: 125000, estado: "Completado", fecha: "2024-04-20", porcentaje: 100 },
    { id: "ORD-2024-002", cliente: "Tech Solutions", producto: "Analytics Premium", monto: 85000, estado: "En Proceso", fecha: "2024-04-19", porcentaje: 75 },
    { id: "ORD-2024-003", cliente: "Global Industries", producto: "Integration Suite", monto: 95000, estado: "En Proceso", fecha: "2024-04-18", porcentaje: 45 },
    { id: "ORD-2024-004", cliente: "Digital Ventures", producto: "Módulo HR", monto: 65000, estado: "Pendiente", fecha: "2024-04-17", porcentaje: 20 },
    { id: "ORD-2024-005", cliente: "Enterprise Plus", producto: "Security Module", monto: 45000, estado: "Pendiente", fecha: "2024-04-16", porcentaje: 0 }
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
