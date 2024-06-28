export const API_URL = "http://localhost:8080";
export const BOOK_API = {
  SEARCH_BOOK: "/api/book/filter-search",
  FILL_SEARCH: "/api/book/search",
  LIST: "/api/book/list",
  ADD: "/api/book/add",
  EDIT: "/api/book/edit",
  RATE: "/api/book/rate",
  DETAIL: "/api/book/book-detail",
  BOOK_HOME: "/api/book"
};
export const PUBLISHER_API = {
  LIST: "/api/publishers",
  ADD: "/api/publishers/add",
  EDIT: "/api/publishers/edit",
  SEARCH: "/api/publishers/search",
};
export const CATEGORY_API = {
  LIST: "/api/categories",
  ADD: "/api/categories/add",
  EDIT: "/api/categories/edit",
  SEARCH: "/api/categories/search",
};
export const AUTHOR_API = {
  LIST: "/api/authors",
  ADD: "/api/authors/add",
  EDIT: "/api/authors/edit",
  SEARCH: "/api/authors/search",
};
export const ORDER_API = {
  ORDER_ADD: "/api/orders/add",
  HISTORY: "/api/orders/history",
  LIST: "/api/orders"
};
export const CART_API = {
  CART_LIST: "/api/carts",
  CART_ADD: "/api/carts/add",
};
export const AUTH_API = {
  LOGIN: "/api/auth/signin",
  SIGNUP: "/api/auth/signup",
  LIST: "/api/auth/list",
  SEARCH: "/api/auth/search",
  CHANGE_STATUS: "/api/auth/change-status"
};
export const FAVORITE_API = {
  LIST: "/api/favorite/list",
  // ADD: "/api/favorite/add",
  // REMOVE: "/api/favorite/remove"
  EDIT: "/api/favorite/edit"
}
