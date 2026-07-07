import React, { useEffect, useState } from 'react';
import { Navbar } from '../shared/components/Navbar';
import { useClientStore } from '../stores/clientStore';

export const EventsPage = () => {
  const { events, fetchEvents, loadingEvents } = useClientStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

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
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Eventos Disponibles</h1>

        {loadingEvents ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004e89]"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎉</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No hay eventos próximos</h3>
            <p className="text-gray-500">Mantente atento a nuestras próximas actualizaciones.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={getImageUrl(event.image)} 
                    alt={event.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {event.type && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm uppercase tracking-wider">
                      {event.type}
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#004e89] shadow-sm uppercase tracking-wider">
                    {event.availableSpots} cupos
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{event.name}</h3>
                    <span className="inline-block px-3 py-1 bg-[#004e89]/10 text-[#004e89] font-bold rounded-lg whitespace-nowrap">
                      Q{event.price?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2 font-medium">
                    📍 {event.restaurant?.name || "Global"}
                  </div>
                  <div className="text-sm text-gray-600 mb-4 font-medium">
                    📅 {new Date(event.date).toLocaleString()}
                  </div>

                  <p className="text-sm text-gray-500 mb-6 line-clamp-3">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
