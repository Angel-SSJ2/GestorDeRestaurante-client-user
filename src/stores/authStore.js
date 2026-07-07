import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import { login as loginRequest, register as registerRequest } from '../shared/api';

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

      register: async ({ name, surname, email, password, phone }) => {
        set({ loading: true, error: null });
        try {
          const { data } = await registerRequest({ name, surname, email, password, phone });

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
    }),
    { name: 'client-auth-store' }
  )
);
