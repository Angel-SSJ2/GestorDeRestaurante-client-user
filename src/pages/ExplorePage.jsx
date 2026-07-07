import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../shared/components/Navbar';
import { useAuthStore } from '../stores/authStore';
import { useClientStore } from '../stores/clientStore';
import { CreateReservationModal } from './components/CreateReservationModal';

export const ExplorePage = () => {
  const { restaurants, fetchRestaurants, search, loading } = useClientStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      search(searchTerm);
    } else {
      fetchRestaurants();
    }
  };

  const handleReservationClick = (restaurant) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setSelectedRestaurant(restaurant);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-300 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[#004e89] text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-[#004e89] opacity-90" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#7cb9e8] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#7cb9e8] opacity-20 rounded-full blur-2xl"></div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-6 z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Descubre tu próximo restaurante favorito
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Explora los mejores lugares de la ciudad, revisa su menú y reserva tu mesa en segundos.
          </p>

          <form onSubmit={handleSearch} className="mt-8 flex w-full max-w-2xl mx-auto bg-white rounded-full shadow-xl overflow-hidden p-1">
            <input 
              type="text" 
              placeholder="Buscar por nombre, categoría o plato..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-6 py-3 text-gray-700 bg-transparent outline-none border-none placeholder-gray-400"
            />
            <button 
              type="submit"
              className="bg-[#1f75fe] hover:bg-blue-900 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300"
            >
              Buscar
            </button>
          </form>
        </div>
      </section>

      {/* Main Content: Restaurants Grid */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recomendados para ti</h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[--main-blue]"></div>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-medium text-gray-600 mb-2">No se encontraron restaurantes</h3>
            <p className="text-gray-400">Intenta con otra búsqueda o descubre nuevos lugares.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <div 
                key={restaurant._id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col border border-gray-100"
              >
                {/* Image Placeholder or Actual Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                  <img 
                    src={restaurant.image || '/Logo_Restaurante.png'} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />                  
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[--main-blue] transition-colors line-clamp-1">
                      {restaurant.name}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {restaurant.description || "Un lugar increíble para disfrutar de la mejor comida de la ciudad en un ambiente espectacular."}
                  </p>
                  
                  <div className="mt-auto space-y-3">
                    <div className="flex items-center text-sm text-gray-600 gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{restaurant.address || "Ciudad, Centro"}</span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={() => navigate(`/restaurant/${restaurant._id}/menu`)}
                        className="flex-1 border-2 border-[#004e89] text-[#004e89] font-semibold py-2 rounded-xl hover:bg-[#004e89] hover:text-white transition-all duration-300"
                      >
                        Ver Menú
                      </button>
                      <button 
                        onClick={() => handleReservationClick(restaurant)}
                        className="flex-1 bg-[#004e89] text-white font-semibold py-2 rounded-xl hover:bg-[#2b323f] transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Reservar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <CreateReservationModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRestaurant(null);
        }}
        restaurant={selectedRestaurant}
      />
    </div>
  );
};
