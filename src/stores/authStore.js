import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import { login as loginRequest, register as registerRequest, updateProfile as updateProfileRequest } from '../shared/api';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      isAuthenticated: false,

      login: async ({ email, password }) => {
        set({ loading: true, error: null });
        try {
          const { data } = await loginRequest({ email, password });

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            loading: false,
          });

          toast.success(`¡Bienvenido, ${data.user?.name || 'Cliente'}!`);
          return { success: true };
        } catch (err) {
          const errorMsg = err.response?.data?.message || 'Error al iniciar sesión';
          set({ loading: false, error: errorMsg });
          toast.error(errorMsg);
          return { success: false, error: errorMsg };
        }
      },

      register: async ({ name, surname, username, email, password, phone }) => {
        set({ loading: true, error: null });
        try {
          const { data } = await registerRequest({ name, surname, username, email, password, phone });

          toast.success(data.message || '¡Cuenta creada con éxito!');
          set({ loading: false });
          return { success: true };
        } catch (err) {
          const errorMsg = err.response?.data?.message || 'Error al registrarse';
          set({ loading: false, error: errorMsg });
          toast.error(errorMsg);
          return { success: false, error: errorMsg };
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        toast.success('Sesión cerrada');
      },

      updateProfile: async (id, data) => {
        set({ loading: true, error: null });
        try {
          const res = await updateProfileRequest(id, data);
          // Assuming the backend returns { user: ... } or we can just merge the local state
          const updatedUser = res.data?.user || res.data?.data || data;
          
          set((state) => ({
            user: { ...state.user, ...updatedUser },
            loading: false
          }));
          toast.success('Perfil actualizado correctamente');
          return { success: true };
        } catch (err) {
          const errorMsg = err.response?.data?.message || 'Error al actualizar el perfil';
          set({ loading: false, error: errorMsg });
          toast.error(errorMsg);
          return { success: false, error: errorMsg };
        }
      },
    }),
    { name: 'client-auth-store' }
  )
);
