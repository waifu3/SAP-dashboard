# Script PowerShell - Crear estructura SAP Dashboard
# Ejecutar como: powershell -ExecutionPolicy Bypass -File setup-dashboard.ps1

Write-Host "🚀 Iniciando setup del SAP Dashboard..." -ForegroundColor Green
Write-Host ""

$projectPath = "C:\Proyectos\sap-dashboard"
Set-Location $projectPath

# 1. Crear carpetas
Write-Host "📁 Creando carpetas..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "src\components" | Out-Null
New-Item -ItemType Directory -Force -Path "src\data" | Out-Null
New-Item -ItemType Directory -Force -Path "src\styles" | Out-Null
New-Item -ItemType Directory -Force -Path "src\utils" | Out-Null
Write-Host "✅ Carpetas creadas" -ForegroundColor Green
Write-Host ""

# 2. Crear mockData.js
Write-Host "📝 Creando mockData.js..." -ForegroundColor Cyan
@'
// src/data/mockData.js - Datos simulados realistas para SAP Dashboard

export const mockData = {
  // KPIs Principales
  kpis: [
    {
      id: 1,
      title: "Ingresos Totales",
      value: 2845600,
      currency: "CLP",
      change: 12.5,
      icon: "TrendingUp",
      color: "blue"
    },
    {
      id: 2,
      title: "Órdenes Completadas",
      value: 1234,
      change: 8.3,
      icon: "ShoppingCart",
      color: "green"
    },
    {
      id: 3,
      title: "Clientes Activos",
      value: 486,
      change: -2.1,
      icon: "Users",
      color: "purple"
    },
    {
      id: 4,
      title: "Margen Operacional",
      value: 32.5,
      unit: "%",
      change: 4.2,
      icon: "BarChart3",
      color: "orange"
    },
    {
      id: 5,
      title: "Inventario Disponible",
      value: 5847,
      unit: "unidades",
      change: 6.8,
      icon: "Package",
      color: "red"
    }
  ],

  // Ventas por Región
  ventasPorRegion: [
    { region: "Norte", ventas: 425000, target: 400000 },
    { region: "Central", ventas: 890000, target: 850000 },
    { region: "Sur", ventas: 652000, target: 600000 },
    { region: "Metropolitana", ventas: 678000, target: 700000 },
    { region: "Austral", ventas: 200600, target: 180000 }
  ],

  // Productos Top 10
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

  // Tendencia Mensual (últimos 12 meses)
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

  // Estado de Inventario por Categoría
  inventarioPorCategoria: [
    { 
      categoria: "Licencias Software", 
      disponible: 1245, 
      minimo: 500, 
      estado: "Óptimo",
      rotacion: "Alta"
    },
    { 
      categoria: "Servicios Implementación", 
      disponible: 856, 
      minimo: 300, 
      estado: "Óptimo",
      rotacion: "Alta"
    },
    { 
      categoria: "Mantenimiento y Soporte", 
      disponible: 1890, 
      minimo: 800, 
      estado: "Óptimo",
      rotacion: "Media"
    },
    { 
      categoria: "Consultoría", 
      disponible: 567, 
      minimo: 200, 
      estado: "Bajo",
      rotacion: "Media"
    },
    { 
      categoria: "Capacitación", 
      disponible: 289, 
      minimo: 150, 
      estado: "Crítico",
      rotacion: "Baja"
    }
  ],

  // Clientes por Industria
  clientesPorIndustria: [
    { industria: "Manufactura", clientes: 145, ingresos: 890000 },
    { industria: "Retail", clientes: 98, ingresos: 567000 },
    { industria: "Servicios Financieros", clientes: 67, ingresos: 756000 },
    { industria: "Gobierno", clientes: 45, ingresos: 345000 },
    { industria: "Educación", clientes: 56, ingresos: 287000 }
  ],

  // Órdenes Recientes
  ordenesRecientes: [
    {
      id: "ORD-2024-001",
      cliente: "Acme Corp",
      producto: "Software ERP Cloud",
      monto: 125000,
      estado: "Completado",
      fecha: "2024-04-20",
      porcentaje: 100
    },
    {
      id: "ORD-2024-002",
      cliente: "Tech Solutions",
      producto: "Analytics Premium",
      monto: 85000,
      estado: "En Proceso",
      fecha: "2024-04-19",
      porcentaje: 75
    },
    {
      id: "ORD-2024-003",
      cliente: "Global Industries",
      producto: "Integration Suite",
      monto: 95000,
      estado: "En Proceso",
      fecha: "2024-04-18",
      porcentaje: 45
    },
    {
      id: "ORD-2024-004",
      cliente: "Digital Ventures",
      producto: "Módulo HR",
      monto: 65000,
      estado: "Pendiente",
      fecha: "2024-04-17",
      porcentaje: 20
    },
    {
      id: "ORD-2024-005",
      cliente: "Enterprise Plus",
      producto: "Security Module",
      monto: 45000,
      estado: "Pendiente",
      fecha: "2024-04-16",
      porcentaje: 0
    }
  ],

  // Métricas de Desempeño
  desempeño: {
    satisfaccionCliente: 4.7,
    tiempoEntrega: 4.2, // días
    tasaDevolucion: 2.1, // %
    costoPorUnidad: 125000,
    eficienciaOperacional: 87.5 // %
  }
};

export default mockData;
'@ | Set-Content "src\data\mockData.js"
Write-Host "✅ mockData.js creado" -ForegroundColor Green
Write-Host ""

# 3. Crear KPICard.jsx
Write-Host "📝 Creando KPICard.jsx..." -ForegroundColor Cyan
@'
import React from 'react';
import { TrendingUp, TrendingDown, ShoppingCart, Users, BarChart3, Package } from 'lucide-react';

const iconMap = {
  TrendingUp: TrendingUp,
  TrendingDown: TrendingDown,
  ShoppingCart: ShoppingCart,
  Users: Users,
  BarChart3: BarChart3,
  Package: Package
};

const colorConfig = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-950', border: 'border-blue-200 dark:border-blue-800', icon: 'text-blue-600 dark:text-blue-400' },
  green: { bg: 'bg-green-50 dark:bg-green-950', border: 'border-green-200 dark:border-green-800', icon: 'text-green-600 dark:text-green-400' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-950', border: 'border-purple-200 dark:border-purple-800', icon: 'text-purple-600 dark:text-purple-400' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-950', border: 'border-orange-200 dark:border-orange-800', icon: 'text-orange-600 dark:text-orange-400' },
  red: { bg: 'bg-red-50 dark:bg-red-950', border: 'border-red-200 dark:border-red-800', icon: 'text-red-600 dark:text-red-400' }
};

export default function KPICard({ kpi }) {
  const Icon = iconMap[kpi.icon] || TrendingUp;
  const colors = colorConfig[kpi.color] || colorConfig.blue;
  const isPositive = kpi.change >= 0;

  const formatValue = (value) => {
    if (kpi.currency) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (kpi.unit === '%') {
      return `${value.toFixed(1)}%`;
    }
    return value.toLocaleString('es-CL');
  };

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-lg p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {kpi.title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatValue(kpi.value)}
            {kpi.unit && <span className="text-sm ml-1">{kpi.unit}</span>}
          </p>
        </div>
        <div className={`${colors.icon} bg-white dark:bg-gray-800 p-3 rounded-lg`}>
          <Icon size={24} />
        </div>
      </div>
      
      <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        <span className="text-sm font-medium">
          {Math.abs(kpi.change)}% {isPositive ? 'aumento' : 'disminución'}
        </span>
      </div>
    </div>
  );
}
'@ | Set-Content "src\components\KPICard.jsx"
Write-Host "✅ KPICard.jsx creado" -ForegroundColor Green
Write-Host ""

# 4. Crear VentasRegional.jsx
Write-Host "📝 Creando VentasRegional.jsx..." -ForegroundColor Cyan
@'
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function VentasRegional({ datos }) {
  const formatCurrency = (value) => `$${(value / 1000).toFixed(0)}K`;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Ventas por Región
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Comparación de ventas vs objetivo
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={datos} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="region" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            tickFormatter={formatCurrency}
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            formatter={(value) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="square"
          />
          <Bar dataKey="ventas" fill="#3b82f6" name="Ventas Reales" radius={[8, 8, 0, 0]} />
          <Bar dataKey="target" fill="#10b981" name="Objetivo" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
'@ | Set-Content "src\components\VentasRegional.jsx"
Write-Host "✅ VentasRegional.jsx creado" -ForegroundColor Green
Write-Host ""

# 5. Crear ProductosTop.jsx
Write-Host "📝 Creando ProductosTop.jsx..." -ForegroundColor Cyan
@'
import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function ProductosTop({ datos }) {
  const [sortBy, setSortBy] = useState('ventas');
  const [ascending, setAscending] = useState(false);

  const sorted = [...datos].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    return ascending ? aVal - bVal : bVal - aVal;
  });

  const formatCurrency = (value) => `$${(value / 1000000).toFixed(1)}M`;
  const toggleSort = (field) => {
    if (sortBy === field) {
      setAscending(!ascending);
    } else {
      setSortBy(field);
      setAscending(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Top 10 Productos
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Productos con mayores ingresos
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                Producto
              </th>
              <th 
                onClick={() => toggleSort('ventas')}
                className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-center justify-end gap-2">
                  Ventas
                  {sortBy === 'ventas' && (
                    ascending ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </th>
              <th 
                onClick={() => toggleSort('cantidad')}
                className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-center justify-end gap-2">
                  Cantidad
                  {sortBy === 'cantidad' && (
                    ascending ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                % Venta
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((producto, idx) => {
              const totalVentas = datos.reduce((acc, p) => acc + p.ventas, 0);
              const porcentaje = ((producto.ventas / totalVentas) * 100).toFixed(1);
              
              return (
                <tr 
                  key={producto.id} 
                  className={`border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    idx < 3 ? 'bg-blue-50 dark:bg-blue-950' : ''
                  }`}
                >
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {idx + 1}. {producto.nombre}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {producto.id}
                      </p>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(producto.ventas)}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">
                    {producto.cantidad.toLocaleString('es-CL')}
                  </td>
                  <td className="text-right py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${porcentaje}%` }}
                        />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-xs font-medium w-8">
                        {porcentaje}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
'@ | Set-Content "src\components\ProductosTop.jsx"
Write-Host "✅ ProductosTop.jsx creado" -ForegroundColor Green
Write-Host ""

# 6. Crear TendenciaVentas.jsx
Write-Host "📝 Creando TendenciaVentas.jsx..." -ForegroundColor Cyan
@'
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TendenciaVentas({ datos }) {
  const formatCurrency = (value) => `$${(value / 1000).toFixed(0)}K`;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Tendencia de Ventas (Últimos 12 Meses)
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Evolución de ventas, presupuesto y ganancia
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={datos} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPresupuesto" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorGanancia" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis 
            dataKey="mes" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            tickFormatter={formatCurrency}
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            formatter={(value) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#fff'
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
          />
          <Area 
            type="monotone" 
            dataKey="ventas" 
            stroke="#3b82f6" 
            fillOpacity={1} 
            fill="url(#colorVentas)"
            name="Ventas Reales"
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="presupuesto" 
            stroke="#10b981" 
            fillOpacity={1} 
            fill="url(#colorPresupuesto)"
            name="Presupuesto"
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="ganancia" 
            stroke="#f59e0b" 
            fillOpacity={1} 
            fill="url(#colorGanancia)"
            name="Ganancia"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4">
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Ventas Promedio</p>
          <p className="text-lg font-bold text-blue-900 dark:text-blue-100">
            {formatCurrency(datos.reduce((a, b) => a + b.ventas, 0) / datos.length)}
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4">
          <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">Total Presupuesto</p>
          <p className="text-lg font-bold text-green-900 dark:text-green-100">
            {formatCurrency(datos.reduce((a, b) => a + b.presupuesto, 0))}
          </p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-950 rounded-lg p-4">
          <p className="text-xs text-orange-600 dark:text-orange-400 font-medium mb-1">Ganancia Total</p>
          <p className="text-lg font-bold text-orange-900 dark:text-orange-100">
            {formatCurrency(datos.reduce((a, b) => a + b.ganancia, 0))}
          </p>
        </div>
      </div>
    </div>
  );
}
'@ | Set-Content "src\components\TendenciaVentas.jsx"
Write-Host "✅ TendenciaVentas.jsx creado" -ForegroundColor Green
Write-Host ""

# 7. Crear EstadoInventario.jsx
Write-Host "📝 Creando EstadoInventario.jsx..." -ForegroundColor Cyan
@'
import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

export default function EstadoInventario({ datos }) {
  const getStatusIcon = (estado) => {
    switch (estado) {
      case 'Óptimo':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'Bajo':
        return <AlertTriangle className="text-orange-500" size={20} />;
      case 'Crítico':
        return <AlertCircle className="text-red-500" size={20} />;
      default:
        return <CheckCircle className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Óptimo':
        return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800';
      case 'Bajo':
        return 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800';
      case 'Crítico':
        return 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const getRotacionColor = (rotacion) => {
    switch (rotacion) {
      case 'Alta':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950';
      case 'Media':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950';
      case 'Baja':
        return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Estado de Inventario
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Disponibilidad por categoría
        </p>
      </div>

      <div className="space-y-4">
        {datos.map((item) => {
          const porcentajeCapacidad = ((item.disponible / (item.minimo * 3)) * 100).toFixed(0);
          const critico = item.disponible < item.minimo;

          return (
            <div 
              key={item.categoria} 
              className={`border rounded-lg p-4 ${getStatusColor(item.estado)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  {getStatusIcon(item.estado)}
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {item.categoria}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.disponible.toLocaleString('es-CL')} unidades disponibles
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${getRotacionColor(item.rotacion)}`}>
                  Rotación: {item.rotacion}
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Capacidad
                    </span>
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                      {porcentajeCapacidad}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        critico ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(parseInt(porcentajeCapacidad), 100)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Mínimo</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {item.minimo.toLocaleString('es-CL')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 dark:text-gray-400">Estado</p>
                    <p className={`font-semibold ${
                      item.estado === 'Óptimo' ? 'text-green-600 dark:text-green-400' :
                      item.estado === 'Bajo' ? 'text-orange-600 dark:text-orange-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {item.estado}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <CheckCircle className="text-green-500" size={16} />
              <span className="font-medium text-gray-900 dark:text-white">
                {datos.filter(d => d.estado === 'Óptimo').length}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Óptimo</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <AlertTriangle className="text-orange-500" size={16} />
              <span className="font-medium text-gray-900 dark:text-white">
                {datos.filter(d => d.estado === 'Bajo').length}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Bajo</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <AlertCircle className="text-red-500" size={16} />
              <span className="font-medium text-gray-900 dark:text-white">
                {datos.filter(d => d.estado === 'Crítico').length}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Crítico</p>
          </div>
        </div>
      </div>
    </div>
  );
}
'@ | Set-Content "src\components\EstadoInventario.jsx"
Write-Host "✅ EstadoInventario.jsx creado" -ForegroundColor Green
Write-Host ""

# 8. Crear Dashboard.jsx
Write-Host "📝 Creando Dashboard.jsx..." -ForegroundColor Cyan
@'
import React, { useState } from 'react';
import { Download, FileText, Sheet3, Filter, Calendar } from 'lucide-react';
import KPICard from './KPICard';
import VentasRegional from './VentasRegional';
import ProductosTop from './ProductosTop';
import TendenciaVentas from './TendenciaVentas';
import EstadoInventario from './EstadoInventario';
import mockData from '../data/mockData';

export default function Dashboard() {
  const [periodo, setPeriodo] = useState('mes');
  const [filtroRegion, setFiltroRegion] = useState('todas');

  const handleExportPDF = () => {
    alert('Exportación a PDF - Próximamente integrado con jsPDF');
  };

  const handleExportExcel = () => {
    alert('Exportación a Excel - Próximamente integrado con XLSX');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                SAP Dashboard
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Vista integral de métricas empresariales
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={handleExportPDF}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors font-medium text-sm"
              >
                <FileText size={18} />
                <span className="hidden sm:inline">PDF</span>
              </button>
              <button
                onClick={handleExportExcel}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition-colors font-medium text-sm"
              >
                <Sheet3 size={18} />
                <span className="hidden sm:inline">Excel</span>
              </button>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-gray-600 dark:text-gray-400" />
              <select 
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="semana">Esta Semana</option>
                <option value="mes">Este Mes</option>
                <option value="trimestre">Este Trimestre</option>
                <option value="anio">Este Año</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-600 dark:text-gray-400" />
              <select 
                value={filtroRegion}
                onChange={(e) => setFiltroRegion(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todas">Todas las Regiones</option>
                <option value="norte">Norte</option>
                <option value="central">Central</option>
                <option value="sur">Sur</option>
                <option value="metropolitana">Metropolitana</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* KPIs Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {mockData.kpis.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} />
          ))}
        </section>

        {/* Gráficos principales */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Ventas por Región */}
          <VentasRegional datos={mockData.ventasPorRegion} />

          {/* Tendencia de Ventas */}
          <div className="lg:col-span-2">
            <TendenciaVentas datos={mockData.tendenciasMensual} />
          </div>
        </section>

        {/* Top Productos */}
        <section className="mb-8">
          <ProductosTop datos={mockData.productosTop} />
        </section>

        {/* Estado Inventario */}
        <section className="mb-8">
          <EstadoInventario datos={mockData.inventarioPorCategoria} />
        </section>

        {/* Footer Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
              Satisfacción del Cliente
            </p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {mockData.desempeño.satisfaccionCliente} ⭐
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
              Tiempo de Entrega Promedio
            </p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {mockData.desempeño.tiempoEntrega} días
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
              Tasa de Devolución
            </p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {mockData.desempeño.tasaDevolucion}%
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
              Eficiencia Operacional
            </p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {mockData.desempeño.eficienciaOperacional}%
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
'@ | Set-Content "src\components\Dashboard.jsx"
Write-Host "✅ Dashboard.jsx creado" -ForegroundColor Green
Write-Host ""

# 9. Crear App.jsx
Write-Host "📝 Creando App.jsx..." -ForegroundColor Cyan
@'
import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
'@ | Set-Content "src\App.jsx"
Write-Host "✅ App.jsx creado" -ForegroundColor Green
Write-Host ""

# 10. Crear App.css
Write-Host "📝 Creando App.css..." -ForegroundColor Cyan
@'
/* App.css - Estilos globales para SAP Dashboard */

:root {
  --color-primary: #3b82f6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-info: #06b6d4;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  scroll-behavior: smooth;
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}
'@ | Set-Content "src\App.css"
Write-Host "✅ App.css creado" -ForegroundColor Green
Write-Host ""

# 11. Crear main.jsx
Write-Host "📝 Creando main.jsx..." -ForegroundColor Cyan
@'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
'@ | Set-Content "src\main.jsx"
Write-Host "✅ main.jsx creado" -ForegroundColor Green
Write-Host ""

# 12. Crear index.css
Write-Host "📝 Creando index.css..." -ForegroundColor Cyan
@'
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Variables CSS personalizadas */
:root {
  color-scheme: light;
}

@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
}

/* Estilos base */
@layer base {
  html {
    @apply scroll-smooth;
  }

  body {
    @apply bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-colors;
  }

  h1 {
    @apply text-3xl font-bold tracking-tight;
  }

  h2 {
    @apply text-2xl font-bold tracking-tight;
  }

  h3 {
    @apply text-xl font-bold;
  }

  button {
    @apply transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="number"],
  select,
  textarea {
    @apply w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors;
  }
}
'@ | Set-Content "src\index.css"
Write-Host "✅ index.css creado" -ForegroundColor Green
Write-Host ""

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "✅ ¡SETUP COMPLETADO!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Archivos creados:" -ForegroundColor Cyan
Write-Host "  ✓ 1 archivo de datos (mockData.js)" -ForegroundColor Green
Write-Host "  ✓ 6 componentes React" -ForegroundColor Green
Write-Host "  ✓ 4 archivos de configuración" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Próximos pasos:" -ForegroundColor Yellow
Write-Host "  1. npm run dev" -ForegroundColor White
Write-Host "  2. Abre http://localhost:5173" -ForegroundColor White
Write-Host ""
