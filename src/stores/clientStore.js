import { create } from 'zustand';
import { getRestaurants, searchRestaurants, getMyReservations, cancelReservation, getTablesByRestaurant, createReservation, getMenuByRestaurant, getAllEvents } from '../shared/api/client';
import toast from 'react-hot-toast';

export const useClientStore = create((set, get) => ({
  restaurants: [],
  reservations: [],
  tables: [],
  menu: [],
  events: [],
  loading: false,
  loadingReservations: false,
  loadingTables: false,
  loadingMenu: false,
  loadingEvents: false,
  error: null,

  fetchRestaurants: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await getRestaurants();
      set({ restaurants: data?.restaurants || data?.data || data || [], loading: false });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error al obtener restaurantes';
      set({ error: errorMsg, loading: false });
      toast.error(errorMsg);
    }
  },

  search: async (query) => {
    if (!query) return;
    set({ loading: true, error: null });
    try {
      const { data } = await searchRestaurants(query);
      set({ restaurants: data?.restaurants || data?.data || data || [], loading: false });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error en la búsqueda';
      set({ error: errorMsg, loading: false });
      toast.error(errorMsg);
    }
  },

  fetchMyReservations: async () => {
    set({ loadingReservations: true, error: null });
    try {
      const { data } = await getMyReservations();
      set({ reservations: data?.reservations || [], loadingReservations: false });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error al obtener reservaciones';
      set({ error: errorMsg, loadingReservations: false });
      toast.error(errorMsg);
    }
  },

  cancelUserReservation: async (id) => {
    try {
      await cancelReservation(id);
      toast.success('Reservación cancelada exitosamente');
      get().fetchMyReservations();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error al cancelar la reservación';
      toast.error(errorMsg);
    }
  },

  fetchTables: async (restaurantId) => {
    set({ loadingTables: true, error: null });
    try {
      const { data } = await getTablesByRestaurant(restaurantId);
      set({ tables: data?.tables || data?.data || data || [], loadingTables: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al cargar mesas', loadingTables: false });
    }
  },

  fetchMenu: async (restaurantId) => {
    set({ loadingMenu: true, error: null, menu: [] });
    try {
      const { data } = await getMenuByRestaurant(restaurantId);
      set({ menu: data?.menu || data?.dishes || data?.data || [], loadingMenu: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al cargar el menú', loadingMenu: false });
    }
  },

  fetchEvents: async () => {
    set({ loadingEvents: true, error: null });
    try {
      const { data } = await getAllEvents();
      set({ events: data?.data || data || [], loadingEvents: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al cargar los eventos', loadingEvents: false });
    }
  },

  makeReservation: async (reservationData) => {
    try {
      await createReservation(reservationData);
      toast.success('Reservación creada exitosamente');
      return { success: true };
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error al hacer la reservación';
      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    }
  }
}));
