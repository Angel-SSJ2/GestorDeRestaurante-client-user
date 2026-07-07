import { axiosClient } from './api';

// ================= RESTAURANTES =================
export const getRestaurants = async () => {
  return await axiosClient.get('/restaurants/list');
};

export const searchRestaurants = async (query) => {
  return await axiosClient.get(`/restaurants/search?query=${encodeURIComponent(query)}`);
};

// ================= MENÚ / PLATOS =================
export const getMenuByRestaurant = async (restaurantId) => {
  return await axiosClient.get(`/dishes/restaurant/${restaurantId}`);
};

// ================= MESAS =================
export const getTablesByRestaurant = async (restaurantId) => {
  return await axiosClient.get(`/tables/list/restaurant/${restaurantId}`);
};

// ================= RESERVACIONES =================
export const createReservation = async (data) => {
  return await axiosClient.post('/reservations/add', data);
};

// ================= EVENTOS =================
export const getAllEvents = async () => {
  return await axiosClient.get('/events/list');
};

export const getMyReservations = async () => {
  return await axiosClient.get('/reservations/my-reservations');
};

export const updateReservation = async (id, data) => {
  return await axiosClient.put(`/reservations/update/${id}`, data);
};

export const cancelReservation = async (id) => {
  return await axiosClient.delete(`/reservations/cancel/${id}`);
};

// ================= EVENTOS =================
export const getEventsByRestaurant = async (restaurantId) => {
  return await axiosClient.get(`/events/list/restaurant/${restaurantId}`);
};

export const reserveEventSpots = async (eventId, data) => {
  return await axiosClient.post(`/events/reserve/${eventId}`, data);
};
