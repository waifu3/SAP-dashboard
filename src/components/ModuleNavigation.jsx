// src/components/ModuleNavigation.jsx
import React from 'react';
import { BarChart3, Package, TrendingUp, ShoppingCart, Users } from 'lucide-react';

export default function ModuleNavigation({ activeModule, setActiveModule }) {
  const modules = [
    {
      id: 'ventas',
      name: 'Ventas',
      icon: BarChart3,
      color: 'blue',
      description: 'Análisis de ventas y tendencias'
    },
    {
      id: 'inventario',
      name: 'Inventario',
      icon: Package,
      color: 'green',
      description: 'Gestión de inventario'
    },
    {
      id: 'finanzas',
      name: 'Finanzas',
      icon: TrendingUp,
      color: 'purple',
      description: 'Análisis financiero'
    },
    {
      id: 'productos',
      name: 'Productos',
      icon: ShoppingCart,
      color: 'amber',
      description: 'Análisis de productos'
    },
    {
      id: 'clientes',
      name: 'Clientes',
      icon: Users,
      color: 'pink',
      description: 'Segmentación de clientes'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto gap-2 py-4">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;
            
            const colorClasses = {
              blue: isActive
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600',
              green: isActive
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600',
              purple: isActive
                ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600',
              amber: isActive
                ? 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600',
              pink: isActive
                ? 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-700'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600',
            };

            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                title={module.description}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all whitespace-nowrap font-medium text-sm ${colorClasses[module.color]}`}
              >
                <Icon size={18} />
                <span>{module.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
