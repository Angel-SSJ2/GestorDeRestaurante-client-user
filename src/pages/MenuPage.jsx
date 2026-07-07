import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../shared/components/Navbar';
import { useClientStore } from '../stores/clientStore';

export const MenuPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { menu, fetchMenu, loadingMenu } = useClientStore();
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const categories = ['todos', 'entrada', 'plato fuerte', 'bebida', 'postre'];

  const filteredMenu = selectedCategory === 'todos' 
    ? menu 
    : menu.filter(dish => dish.category === selectedCategory);

  useEffect(() => {
    if (id) {
      fetchMenu(id);
    }
  }, [id, fetchMenu]);

  const getImageUrl = (imagePath) => {
    if (typeof imagePath !== 'string') return imagePath;
    if (imagePath.startsWith('http') || imagePath.startsWith('blob:')) return imagePath;
    const baseUrl = "http://localhost:3003";
    return `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  return (
    <div className="min-h-screen bg-slate-300 flex flex-col font-sans">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow">
        
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 hover:shadow-md transition-all text-[#004e89]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-3xl font-extrabold text-gray-900">Menú del Restaurante</h1>
        </div>

        {loadingMenu ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004e89]"></div>
          </div>
        ) : menu.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#004e89]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No hay platos disponibles</h3>
            <p className="text-gray-500">Este restaurante aún no ha publicado su menú.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-[#004e89] text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {filteredMenu.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No se encontraron platillos en esta categoría.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMenu.map((dish) => (
                  <div key={dish._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={getImageUrl(dish.image)} 
                    alt={dish.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {dish.category && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm uppercase tracking-wider">
                      {dish.category}
                    </div>
                  )}
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{dish.name}</h3>
                    <span className="inline-block px-3 py-1 bg-[#004e89]/10 text-[#004e89] font-bold rounded-lg whitespace-nowrap">
                      Q{dish.price?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                    {dish.description || "Un platillo delicioso preparado con los mejores ingredientes."}
                  </p>
                  
                </div>
              </div>
            ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};
