import { create } from "zustand";

const useSearchStore = create((set) => ({
  searchData: {
    author: "",
    category: "",
    publisher: "",
    title: "",
    language: "",
    price: 1
  },
  setSearchData: (value) =>
    set((state) => ({
      ...state,
      searchData: { ...state?.searchData, ...value },
    })),
}));

export default useSearchStore;
