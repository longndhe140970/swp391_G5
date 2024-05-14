import { create } from "zustand";

const usePopupStore = create((set) => ({
  openLoadingPopup: false,
  handleOpenLoading: () => set({ openLoadingPopup: true }),
  handleCloseLoading: () => set({ openLoadingPopup: false }),
}));

export default usePopupStore;