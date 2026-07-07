import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#191971] backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <img src="/Logo_Restaurante.png" alt="Logo" className="w-8 h-8 object-contain" />
            <Link to="/" className="text-xl font-bold text-[#f2f6fc]">
              UrbanCentral
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <Link to="/" className="text-sm font-medium text-[#f2f6fc] hover:text-gray-300 transition-colors">
              Explorar
            </Link>
            <Link to="/events" className="text-sm font-medium text-[#f2f6fc] hover:text-gray-300 transition-colors">
              Eventos
            </Link>
            {isAuthenticated && (
              <Link to="/reservations" className="text-sm font-medium text-[#f2f6fc] hover:text-gray-300 transition-colors">
                Mis Reservaciones
              </Link>
            )}
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#f2f6fc]">
                  {user?.name} {user?.surname}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:text-red-700 transition-colors font-medium"
                >
                  Salir
                </button>
              </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-[#f2f6fc] hover:text-[#2b323f] transition-colors">
                Iniciar Sesión
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
