import React, { useState } from 'react';
import { Navbar } from '../shared/components/Navbar';
import { useAuthStore } from '../stores/authStore';

export const ProfilePage = () => {
  const { user, updateProfile, loading } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    surname: user?.surname || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProfile(user?.id || user?._id, formData);
    if (res.success) {
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h1 className="text-3xl font-extrabold text-blue-900">Mi Perfil</h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-[#1f75fe] hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300 shadow-md"
              >
                Editar
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#1f75fe] focus:border-transparent transition-all outline-none disabled:opacity-70 disabled:bg-gray-100"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Apellidos</label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#1f75fe] focus:border-transparent transition-all outline-none disabled:opacity-70 disabled:bg-gray-100"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#1f75fe] focus:border-transparent transition-all outline-none disabled:opacity-70 disabled:bg-gray-100"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#1f75fe] focus:border-transparent transition-all outline-none disabled:opacity-70 disabled:bg-gray-100"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user?.name || '',
                      surname: user?.surname || '',
                      email: user?.email || '',
                      phone: user?.phone || ''
                    });
                  }}
                  className="flex-1 py-3 px-6 rounded-xl font-semibold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-6 rounded-xl font-semibold bg-[#004e89] hover:bg-[#1f75fe] text-white transition-colors shadow-md flex justify-center items-center"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Guardar Cambios'
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};
