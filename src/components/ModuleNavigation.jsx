// src/components/ModuleNavigation.jsx
import { BarChart3, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';

const modules = [
  {
    id: 'ventas',
    name: 'Ventas',
    icon: BarChart3,
    color: 'blue',
    description: 'Análisis de ventas',
  },
  {
    id: 'inventario',
    name: 'Inventario',
    icon: Package,
    color: 'green',
    description: 'Gestión de inventario',
  },
  {
    id: 'finanzas',
    name: 'Finanzas',
    icon: TrendingUp,
    color: 'purple',
    description: 'Análisis financiero',
  },
  {
    id: 'productos',
    name: 'Productos',
    icon: ShoppingCart,
    color: 'amber',
    description: 'Análisis de productos',
  },
  {
    id: 'clientes',
    name: 'Clientes',
    icon: Users,
    color: 'pink',
    description: 'Segmentación de clientes',
  },
];

const activeClasses = {
  blue: 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300',
  green: 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  purple: 'border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300',
  amber: 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300',
  pink: 'border-pink-300 bg-pink-50 text-pink-700 dark:border-pink-800 dark:bg-pink-950 dark:text-pink-300',
};

const inactiveClasses =
  'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800';

export default function ModuleNavigation({ activeModule, setActiveModule }) {
  return (
    <nav className="border-b border-slate-200 bg-slate-100/90 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto py-3">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;

            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                title={module.description}
                className={`flex min-w-28 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold whitespace-nowrap shadow-sm transition sm:min-w-0 sm:px-4 ${isActive ? activeClasses[module.color] : inactiveClasses}`}
              >
                <Icon size={17} />
                {module.name}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
