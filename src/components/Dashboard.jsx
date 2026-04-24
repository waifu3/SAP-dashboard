import React, { useState } from 'react';
import { FileText, Sheet, Filter, Calendar } from 'lucide-react';
import KPICard from './KPICard';
import VentasRegional from './VentasRegional';
import ProductosTop from './ProductosTop';
import TendenciaVentas from './TendenciaVentas';
import EstadoInventario from './EstadoInventario';
import mockData from '../data/mockData';
import { exportDashboardToPDF } from '../utils/exportPDF';
import { exportToExcel } from '../utils/exportExcel';

export default function Dashboard() {
  const [periodo, setPeriodo] = useState('mes');
  const [filtroRegion, setFiltroRegion] = useState('todas');

  const handleExportPDF = () => {
    exportDashboardToPDF(mockData);
  };

  const handleExportExcel = () => {
    exportToExcel(mockData);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" id="dashboard-root">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Panel de control de SAP
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Vista integral de métricas empresariales.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={handleExportPDF}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors font-medium text-sm border border-red-200 dark:border-red-800"
              >
                <FileText size={18} />
                <span className="hidden sm:inline">PDF</span>
              </button>
              <button
                onClick={handleExportExcel}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition-colors font-medium text-sm border border-green-200 dark:border-green-800"
              >
                <Sheet size={18} />
                <span className="hidden sm:inline">Sobresalir</span>
              </button>
            </div>
          </div>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {mockData.kpis.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} />
          ))}
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <VentasRegional datos={mockData.ventasPorRegion} />
          <div className="lg:col-span-2">
            <TendenciaVentas datos={mockData.tendenciasMensual} />
          </div>
        </section>
        <section className="mb-8">
          <ProductosTop datos={mockData.productosTop} />
        </section>
        <section className="mb-8">
          <EstadoInventario datos={mockData.inventarioPorCategoria} />
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Satisfacción del Cliente</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{mockData.desempeño.satisfaccionCliente} ⭐</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Tiempo de Entrega Promedio</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{mockData.desempeño.tiempoEntrega} días</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Tasa de Devolución</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{mockData.desempeño.tasaDevolucion}%</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Eficiencia Operacional</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{mockData.desempeño.eficienciaOperacional}%</p>
          </div>
        </section>
      </main>
    </div>
  );
}