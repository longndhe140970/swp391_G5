import { create } from "zustand";

const useSearchStore = create((set) => ({
  searchData: {
    author: "",
    department: "",
    publisher: "",
    title: "",
    language: "",
  },
  setSearchData: (value) =>
    set((state) => ({
      ...state,
      searchData: { ...state?.searchData, ...value },
    })),
}));

export default useSearchStore;
