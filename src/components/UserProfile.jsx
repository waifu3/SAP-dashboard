// src/components/UserProfile.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/useAuth';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="relative">
      {/* Botón de Perfil */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <img
          src={user.imagen}
          alt={user.nombre}
          className="w-8 h-8 rounded-full border-2 border-blue-500"
        />
        <div className="hidden sm:block text-left">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {user.nombre}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{user.rol}</p>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-600 dark:text-gray-400 transition-transform ${
            menuOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Menú Dropdown */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="font-semibold text-gray-900 dark:text-white">
              {user.nombre}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Empresa: {user.empresa}
            </p>
          </div>

          {/* Stats */}
          <div className="px-4 py-3 grid grid-cols-2 gap-2 border-b border-gray-200 dark:border-gray-700">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
              <p className="text-xs text-gray-600 dark:text-gray-400">Rol</p>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                {user.rol}
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
              <p className="text-xs text-gray-600 dark:text-gray-400">Estado</p>
              <p className="font-semibold text-green-600 dark:text-green-400 text-sm">
                Activo
              </p>
            </div>
          </div>

          {/* Opciones */}
          <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm">
            <User size={16} />
            Ver Perfil
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm">
            <Settings size={16} />
            Configuración
          </button>

          {/* Logout */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium"
            >
              <LogOut size={16} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
