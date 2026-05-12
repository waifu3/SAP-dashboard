// src/components/Dashboard.jsx
import { useEffect, useMemo, useState } from 'react';
import { Activity, Calendar, Clock, Database, FileText, Filter, RefreshCw, Sheet } from 'lucide-react';
import ExecutiveAlerts from './ExecutiveAlerts';
import ExecutiveSummary from './ExecutiveSummary';
import KPICard from './KPICard';
import UserProfile from './UserProfile';
import ModuleNavigation from './ModuleNavigation';
import MobileMenu from './MobileMenu';
import ModuloVentas from './modules/ModuloVentas';
import ModuloInventario from './modules/ModuloInventario';
import ModuloFinanzas from './modules/ModuloFinanzas';
import ModuloProductos from './modules/ModuloProductos';
import ModuloClientes from './modules/ModuloClientes';
import mockDataFallback from '../data/mockData';
import { useDashboardData } from '../hooks/useSAPData';
import { exportDashboardToPDF } from '../utils/exportPDF';
import { exportToExcel } from '../utils/exportExcel';
import { getExecutiveAlerts, getExecutiveSummary, getFilteredDashboardData } from '../utils/dashboardFilters';

const moduleLabels = {
  ventas: 'Ventas',
  inventario: 'Inventario',
  finanzas: 'Finanzas',
  productos: 'Productos',
  clientes: 'Clientes',
};

const refreshOptions = [
  { value: 0, label: 'Manual' },
  { value: 300000, label: '5 min' },
  { value: 900000, label: '15 min' },
  { value: 1800000, label: '30 min' },
];

export default function Dashboard() {
  const [periodo, setPeriodo] = useState('mes');
  const [filtroRegion, setFiltroRegion] = useState('todas');
  const [activeModule, setActiveModule] = useState('ventas');
  const [refreshInterval, setRefreshInterval] = useState(0);
  const [lastManualRefresh, setLastManualRefresh] = useState(null);
  const { dashboardData, loading, error, refetchDashboard } = useDashboardData();
  const dashboardDataSource = dashboardData || mockDataFallback;
  const filteredDashboardData = useMemo(
    () => getFilteredDashboardData(dashboardDataSource, { periodo, filtroRegion }),
    [dashboardDataSource, periodo, filtroRegion]
  );
  const executiveAlerts = useMemo(
    () => getExecutiveAlerts(filteredDashboardData),
    [filteredDashboardData]
  );
  const executiveSummary = useMemo(
    () => getExecutiveSummary(filteredDashboardData, executiveAlerts),
    [filteredDashboardData, executiveAlerts]
  );
  const sourceLabel = dashboardDataSource._meta?.source === 'mock' ? 'Datos mock' : 'SAP B1';
  const updatedAt = dashboardDataSource._meta?.generatedAt
    ? new Date(dashboardDataSource._meta.generatedAt).toLocaleString('es-CL')
    : 'Sin sincronizar';

  const handleExportPDF = () => {
    exportDashboardToPDF(filteredDashboardData);
  };

  const handleExportExcel = () => {
    exportToExcel(filteredDashboardData);
  };

  const handleRefresh = async () => {
    const result = await refetchDashboard({ forceRefresh: true });
    if (result) {
      setLastManualRefresh(new Date());
    }
  };

  useEffect(() => {
    if (!refreshInterval) return undefined;

    const intervalId = setInterval(() => {
      refetchDashboard({ forceRefresh: true });
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [refetchDashboard, refreshInterval]);

  const renderModulo = () => {
    switch (activeModule) {
      case 'ventas':
        return <ModuloVentas mockData={filteredDashboardData} />;
      case 'inventario':
        return <ModuloInventario mockData={filteredDashboardData} />;
      case 'finanzas':
        return <ModuloFinanzas mockData={filteredDashboardData} />;
      case 'productos':
        return <ModuloProductos mockData={filteredDashboardData} />;
      case 'clientes':
        return <ModuloClientes mockData={filteredDashboardData} />;
      default:
        return <ModuloVentas mockData={filteredDashboardData} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 dark:bg-gray-950 dark:text-white" id="dashboard-root">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-950/90">
        <div className="mx-auto max-w-7xl px-3 py-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  <Activity size={14} />
                  {moduleLabels[activeModule]}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                  <Database size={14} />
                  {sourceLabel}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                  {filteredDashboardData._filters.regionLabel}
                </span>
              </div>

              <h1 className="mt-2 truncate text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                Panel SAP Business One
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-gray-400">
                Control ejecutivo de ventas, inventario, finanzas, productos y clientes.
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-gray-500">
                Actualizado: {updatedAt}
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <div className="flex w-full flex-col gap-2 sm:flex-row lg:justify-end">
                <label className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-gray-700 dark:bg-gray-900 lg:min-w-44">
                  <Calendar size={16} className="shrink-0 text-slate-500 dark:text-gray-400" />
                  <select
                    value={periodo}
                    onChange={(e) => setPeriodo(e.target.value)}
                    className="border-0 bg-transparent p-0 text-sm font-medium text-slate-800 shadow-none focus:ring-0 dark:text-white"
                    aria-label="Periodo"
                  >
                    <option value="semana">Esta semana</option>
                    <option value="mes">Este mes</option>
                    <option value="trimestre">Este trimestre</option>
                    <option value="anio">Este año</option>
                  </select>
                </label>

                <label className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-gray-700 dark:bg-gray-900 lg:min-w-52">
                  <Filter size={16} className="shrink-0 text-slate-500 dark:text-gray-400" />
                  <select
                    value={filtroRegion}
                    onChange={(e) => setFiltroRegion(e.target.value)}
                    className="border-0 bg-transparent p-0 text-sm font-medium text-slate-800 shadow-none focus:ring-0 dark:text-white"
                    aria-label="Región"
                  >
                    <option value="todas">Todas las regiones</option>
                    <option value="norte">Norte</option>
                    <option value="central">Central</option>
                    <option value="sur">Sur</option>
                    <option value="metropolitana">Metropolitana</option>
                  </select>
                </label>

                <label className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-gray-700 dark:bg-gray-900 lg:min-w-36">
                  <Clock size={16} className="shrink-0 text-slate-500 dark:text-gray-400" />
                  <select
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(Number(e.target.value))}
                    className="border-0 bg-transparent p-0 text-sm font-medium text-slate-800 shadow-none focus:ring-0 dark:text-white"
                    aria-label="Refresco automático"
                  >
                    {refreshOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="flex w-full items-center gap-2 sm:w-auto">
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900 sm:flex-none"
                >
                  <RefreshCw size={17} className={loading ? 'animate-spin' : ''} />
                  Actualizar
                </button>
                <button
                  onClick={handleExportPDF}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900 sm:flex-none"
                >
                  <FileText size={17} />
                  PDF
                </button>
                <button
                  onClick={handleExportExcel}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 dark:hover:bg-emerald-900 sm:flex-none"
                >
                  <Sheet size={17} />
                  Excel
                </button>
                <div className="hidden border-l border-slate-200 pl-3 dark:border-gray-800 sm:block">
                  <UserProfile />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 border-t border-slate-200 pt-3 dark:border-gray-800 sm:hidden">
            <UserProfile />
          </div>
        </div>
      </header>

      <ModuleNavigation activeModule={activeModule} setActiveModule={setActiveModule} />

      <main className="mx-auto max-w-7xl px-3 py-4 pb-24 sm:px-4 sm:py-6 md:px-6 lg:px-8">
        {loading && (
          <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
            Sincronizando datos del dashboard...
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
            No se pudo conectar con la API SAP. Se muestran datos locales de respaldo.
          </div>
        )}

        {lastManualRefresh && (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300">
            Datos actualizados manualmente a las {lastManualRefresh.toLocaleTimeString('es-CL')}.
          </div>
        )}

        <ExecutiveSummary summary={executiveSummary} />

        <ExecutiveAlerts alerts={executiveAlerts} />

        <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {filteredDashboardData.kpis.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} />
          ))}
        </section>

        <section className="space-y-6">
          {renderModulo()}
        </section>
      </main>

      <MobileMenu activeModule={activeModule} setActiveModule={setActiveModule} />
    </div>
  );
}
