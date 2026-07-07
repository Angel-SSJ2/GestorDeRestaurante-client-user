import React, { useEffect } from 'react';
import { Navbar } from '../shared/components/Navbar';
import { useClientStore } from '../stores/clientStore';

export const ReservationsPage = () => {
  const { reservations, loadingReservations, fetchMyReservations, cancelUserReservation } = useClientStore();

  useEffect(() => {
    fetchMyReservations();
  }, [fetchMyReservations]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmada': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelada': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="min-h-screen bg-slate-300 flex flex-col font-sans">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Mis Reservaciones</h1>

        {loadingReservations ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004e89]"></div>
          </div>
        ) : reservations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#004e89]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No tienes reservaciones</h3>
            <p className="text-gray-500 max-w-md mx-auto">Aún no has reservado en ningún restaurante. ¡Explora las opciones y planifica tu próxima salida!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {reservations.map((reservation) => (
              <div key={reservation._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:shadow-md">
                <div className="flex-grow space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900">{reservation.restaurant?.name || 'Restaurante Desconocido'}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusColor(reservation.status)}`}>
                      {reservation.status}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(reservation.date)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {reservation.guests} personas
                    </div>
                    {reservation.table?.number && (
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Mesa {reservation.table.number}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-auto flex-shrink-0">
                  {reservation.status === 'pendiente' && (
                    <button 
                      onClick={() => {
                        if(window.confirm('¿Estás seguro de que deseas cancelar esta reservación?')) {
                          cancelUserReservation(reservation._id);
                        }
                      }}
                      className="w-full md:w-auto px-5 py-2.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 rounded-xl transition-colors border border-red-100"
                    >
                      Cancelar Reservación
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
