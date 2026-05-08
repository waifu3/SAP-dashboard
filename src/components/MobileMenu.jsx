// src/components/MobileMenu.jsx
import { useState } from 'react';
import { Menu, X, BarChart3, Package, TrendingUp, ShoppingCart, Users } from 'lucide-react';

export default function MobileMenu({ activeModule, setActiveModule }) {
  const [isOpen, setIsOpen] = useState(false);

  const modules = [
    {
      id: 'ventas',
      name: 'Ventas',
      icon: BarChart3,
      color: 'blue'
    },
    {
      id: 'inventario',
      name: 'Inventario',
      icon: Package,
      color: 'green'
    },
    {
      id: 'finanzas',
      name: 'Finanzas',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      id: 'productos',
      name: 'Productos',
      icon: ShoppingCart,
      color: 'amber'
    },
    {
      id: 'clientes',
      name: 'Clientes',
      icon: Users,
      color: 'pink'
    }
  ];

  const handleModuleSelect = (moduleId) => {
    setActiveModule(moduleId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button (Solo en móvil) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Menu Panel */}
          <div className="md:hidden fixed bottom-20 right-6 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-2 w-48">
            <div className="space-y-1">
              {modules.map((module) => {
                const Icon = module.icon;
                const isActive = activeModule === module.id;

                const colorClasses = {
                  blue: isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700',
                  green: isActive ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700',
                  purple: isActive ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700',
                  amber: isActive ? 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700',
                  pink: isActive ? 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700',
                };

                return (
                  <button
                    key={module.id}
                    onClick={() => handleModuleSelect(module.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${colorClasses[module.color]}`}
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
