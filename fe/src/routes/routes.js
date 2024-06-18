import AdminAccountPage from "../pages/AdminAccount";
import BookDetailPage from "../pages/BookDetail/BookDetailPage";
import CartPage from "../pages/Cart";
import DashBoardPage from "../pages/Dashboard";
import FavoritePage from "../pages/Favorite";
import HistoryPage from "../pages/History";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login/LoginPage";
import ProfilePage from "../pages/Profile";
import SearchBookPage from "../pages/SearchBook";
import SignUpPage from "../pages/SignUpPage";
import EmplAuthorPage from "../pages/employee/AuthorPage";
import EmplBookPage from "../pages/employee/BookPage";
import EmplCategoryPage from "../pages/employee/CategoryPage";
import EmplOrderPage from "../pages/employee/OrderPage";
import EmplPublisherPage from "../pages/employee/PublisherPage";
import { DEFINE_ROUTES_ADMIN } from "./MenuAdmin";
import { DEFINE_ROUTES_EMPL } from "./MenuEmpl";

export const ConfigRotues = [
  {
    path: "/",
    page: <HomePage />
  }, {
    path: "/login",
    page: <LoginPage />
  },
  {
    path: "/search",
    page: <SearchBookPage />
  },
  {
    path: "/signup",
    page: <SignUpPage />
  },
  {
    path: "/profile",
    page: <ProfilePage />
  },
  {
    path: "/cart",
    page: <CartPage />
  },
  {
    path: "/book-detail",
    page: <BookDetailPage />
  },
  {
    path: "/favorite",
    page: <FavoritePage />
  },
  {
    path: "/history",
    page: <HistoryPage />
  },
  {
    path: DEFINE_ROUTES_ADMIN.ADMIN_DASHBOARD,
    page: <DashBoardPage />
  },
  {
    path: DEFINE_ROUTES_ADMIN.ADMIN_EMPLOYEE,
    page: <AdminAccountPage />
  },
  {
    path: DEFINE_ROUTES_EMPL.EMPL_BOOK_LIST,
    page: <EmplBookPage />
  },
  {
    path: DEFINE_ROUTES_EMPL.EMPL_ORDER_LIST,
    page: <EmplOrderPage />
  },
  {
    path: DEFINE_ROUTES_EMPL.EMPL_AUTHOR_LIST,
    page: <EmplAuthorPage />
  },
  {
    path: DEFINE_ROUTES_EMPL.EMPL_PUBLISHER_LIST,
    page: <EmplPublisherPage />
  },
  {
    path: DEFINE_ROUTES_EMPL.EMPL_CATEGORY_LIST,
    page: <EmplCategoryPage />
  },
]