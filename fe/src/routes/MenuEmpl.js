export const DEFINE_ROUTES_EMPL = {
  EMPL_INFORMATION: "/employee/information",
  EMPL_BOOK_LIST: "/employee/book/list",
  EMPL_BOOK_ADD: "/employee/book/add",
  EMPL_BOOK_DETAIL: "/employee/book/detail",
  EMPL_ORDER_LIST: "/employee/order/list",
  EMPL_ORDER_ADD: "/employee/order/list",
  EMPL_ORDER_DETAIL: "/employee/order/detail",
  EMPL_CATEGORY_LIST: "/employee/category/list",
  EMPL_CATEGORY_ADD: "/employee/category/add",
  EMPL_CATEGORY_DETAIL: "/employee/category/detail",
  EMPL_PUBLISHER_LIST: "/employee/publisher/list",
  EMPL_PUBLISHER_ADD: "/employee/publisher/add",
  EMPL_PUBLISHER_DETAIL: "/employee/publisher/detail",
  EMPL_AUTHOR_LIST: "/employee/author/list",
  EMPL_AUTHOR_ADD: "/employee/author/add",
  EMPL_AUTHOR_DETAIL: "/employee/author/detail",
}

export const MenuEmpl = [
  {
    title: "Thong tin",
    path: DEFINE_ROUTES_EMPL.EMPL_INFORMATION,
    activePath: "/employee/information"
  },
  {
    title: "Don hang",
    path: DEFINE_ROUTES_EMPL.EMPL_ORDER_LIST,
    activePath: "/employee/order"
  },
  {
    title: "Sach",
    path: DEFINE_ROUTES_EMPL.EMPL_BOOK_LIST,
    activePath: "/employee/book"
  },
  {
    title: "Nha xuat ban",
    path: DEFINE_ROUTES_EMPL.EMPL_PUBLISHER_LIST,
    activePath: "/employee/publisher"
  },
  {
    title: "Tac gia",
    path: DEFINE_ROUTES_EMPL.EMPL_AUTHOR_LIST,
    activePath: "/employee/author"
  },
  {
    title: "Danh muc",
    path: DEFINE_ROUTES_EMPL.EMPL_CATEGORY_LIST,
    activePath: "/employee/category"
  },
]