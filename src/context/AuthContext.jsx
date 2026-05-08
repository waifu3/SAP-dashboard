// src/context/AuthContext.jsx
import { useState } from 'react';
import { AuthContext } from './authContextValue';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const loading = false;

  const login = (email, password) => {
    // Validación simple (en producción usarías una API real)
    if (email && password.length >= 6) {
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        nombre: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        rol: 'Administrador',
        imagen: `https://ui-avatars.com/api/?name=${email}&background=random`,
        loginDate: new Date().toLocaleDateString('es-CL'),
        empresa: 'Euro Plant'
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
