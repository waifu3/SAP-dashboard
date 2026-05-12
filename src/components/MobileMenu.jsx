// src/components/MobileMenu.jsx
import { useState } from 'react';
import { BarChart3, Menu, Package, ShoppingCart, TrendingUp, Users, X } from 'lucide-react';

const modules = [
  { id: 'ventas', name: 'Ventas', icon: BarChart3, color: 'blue' },
  { id: 'inventario', name: 'Inventario', icon: Package, color: 'green' },
  { id: 'finanzas', name: 'Finanzas', icon: TrendingUp, color: 'purple' },
  { id: 'productos', name: 'Productos', icon: ShoppingCart, color: 'amber' },
  { id: 'clientes', name: 'Clientes', icon: Users, color: 'pink' },
];

const colorClasses = {
  blue: {
    active: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    inactive: 'text-slate-700 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-gray-800',
  },
  green: {
    active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    inactive: 'text-slate-700 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-gray-800',
  },
  purple: {
    active: 'bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300',
    inactive: 'text-slate-700 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-gray-800',
  },
  amber: {
    active: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    inactive: 'text-slate-700 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-gray-800',
  },
  pink: {
    active: 'bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300',
    inactive: 'text-slate-700 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-gray-800',
  },
};

export default function MobileMenu({ activeModule, setActiveModule }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModuleSelect = (moduleId) => {
    setActiveModule(moduleId);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-slate-950 p-3 text-white shadow-xl transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 md:hidden"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed bottom-20 right-6 z-40 w-52 rounded-lg border border-slate-200 bg-white p-2 shadow-2xl dark:border-gray-700 dark:bg-gray-900 md:hidden">
            <div className="space-y-1">
              {modules.map((module) => {
                const Icon = module.icon;
                const isActive = activeModule === module.id;
                const styles = colorClasses[module.color];

                return (
                  <button
                    key={module.id}
                    onClick={() => handleModuleSelect(module.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition ${isActive ? styles.active : styles.inactive}`}
                  >
                    <Icon size={18} />
                    <span>{module.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
