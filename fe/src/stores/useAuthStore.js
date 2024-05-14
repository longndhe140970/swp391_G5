import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: {},
  setUser: (value) => set((state) => ({ ...state, user: value })),
}));

export default useAuthStore;
