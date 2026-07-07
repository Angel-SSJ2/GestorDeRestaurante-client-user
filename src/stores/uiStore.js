import { create } from 'zustand';

export const useUIStore = create((set) => ({
  modal: null,

  openModal: (content) => set({ modal: content }),
  closeModal: () => set({ modal: null }),
}));
