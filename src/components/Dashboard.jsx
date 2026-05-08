// src/components/Dashboard.jsx - RESPONSIVE MEJORADO
import { useState } from 'react';
import { FileText, Sheet, Filter, Calendar } from 'lucide-react';
import KPICard from './KPICard';
import UserProfile from './UserProfile';
import ModuleNavigation from './ModuleNavigation';
import MobileMenu from './MobileMenu';
import ModuloVentas from './modules/ModuloVentas';
import ModuloInventario from './modules/ModuloInventario';
import ModuloFinanzas from './modules/ModuloFinanzas';
import ModuloProductos from './modules/ModuloProductos';
import ModuloClientes from './modules/ModuloClientes';
import mockData from '../data/mockData';
import { exportDashboardToPDF } from '../utils/exportPDF';
import { exportToExcel } from '../utils/exportExcel';

export default function Dashboard() {
  const [periodo, setPeriodo] = useState('mes');
  const [filtroRegion, setFiltroRegion] = useState('todas');
  const [activeModule, setActiveModule] = useState('ventas');

  const handleExportPDF = () => {
    exportDashboardToPDF(mockData);
  };

  const handleExportExcel = () => {
    exportToExcel(mockData);
  };

  const renderModulo = () => {
    switch (activeModule) {
      case 'ventas':
        return <ModuloVentas mockData={mockData} />;
      case 'inventario':
        return <ModuloInventario mockData={mockData} />;
      case 'finanzas':
        return <ModuloFinanzas mockData={mockData} />;
      case 'productos':
        return <ModuloProductos mockData={mockData} />;
      case 'clientes':
        return <ModuloClientes mockData={mockData} />;
      default:
        return <ModuloVentas mockData={mockData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" id="dashboard-root">
      {/* Header - Responsive */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
          {/* Header Content */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {/* Title */}
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white truncate">
                Panel SAP
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1 truncate">
                Vista integral de métricas
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              {/* Buttons */}
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleExportPDF}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors font-medium text-xs sm:text-sm border border-red-200 dark:border-red-800"
                >
                  <FileText size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="hidden sm:inline">PDF</span>
                </button>
                <button
                  onClick={handleExportExcel}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition-colors font-medium text-xs sm:text-sm border border-green-200 dark:border-green-800"
                >
                  <Sheet size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="hidden sm:inline">Excel</span>
                </button>
              </div>

              {/* User Profile */}
              <div className="hidden sm:block border-l border-gray-300 dark:border-gray-700 pl-3 sm:pl-4">
                <UserProfile />
              </div>
            </div>
          </div>

          {/* Filters - Responsive */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
            <div className="flex items-center gap-2 flex-1">
              <Calendar size={16} className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
              <select 
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="flex-1 px-2 sm:px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="semana">Esta Semana</option>
                <option value="mes">Este Mes</option>
                <option value="trimestre">Este Trimestre</option>
                <option value="anio">Este Año</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 flex-1">
              <Filter size={16} className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
              <select 
                value={filtroRegion}
                onChange={(e) => setFiltroRegion(e.target.value)}
                className="flex-1 px-2 sm:px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todas">Todas las Regiones</option>
                <option value="norte">Norte</option>
                <option value="central">Central</option>
                <option value="sur">Sur</option>
                <option value="metropolitana">Metropolitana</option>
              </select>
            </div>
          </div>

          {/* Mobile User Profile */}
          <div className="sm:hidden mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
            <UserProfile />
          </div>
        </div>
      </header>

      {/* Module Navigation - Responsive */}
      <ModuleNavigation activeModule={activeModule} setActiveModule={setActiveModule} />

      {/* Main Content - Responsive */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 pb-20 sm:pb-8">
        {/* KPIs - Responsive Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {mockData.kpis.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} />
          ))}
        </section>

        {/* Module Content */}
        <section className="space-y-6 sm:space-y-8">
          {renderModulo()}
        </section>
      </main>

      {/* Mobile Menu */}
      <MobileMenu activeModule={activeModule} setActiveModule={setActiveModule} />
    </div>
  );
}
