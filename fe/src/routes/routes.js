import TextEditor from "../components/TextArea";
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
import EmplAddBookPage from "../pages/employee/AddBookPage";
import EmplAuthorAdd from "../pages/employee/AuthorAdd";
import EmplAuthorPage from "../pages/employee/AuthorPage";
import EmplBookPage from "../pages/employee/BookPage";
import EmplCategoryAdd from "../pages/employee/CategoryAdd";
import EmplCategoryPage from "../pages/employee/CategoryPage";
import EmplOrderAdd from "../pages/employee/OrderAdd";
import EmplOrderPage from "../pages/employee/OrderPage";
import EmplPublisherAdd from "../pages/employee/PublisherAdd";
import EmplPublisherPage from "../pages/employee/PublisherPage";
import { DEFINE_ROUTES_ADMIN } from "./MenuAdmin";
import { DEFINE_ROUTES_EMPL } from "./MenuEmpl";

export const ConfigRotues = [
  {
    path: "/",
    page: <HomePage />
  },
  {
    path: "/home",
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
    path: "/book-detail/:slug",
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
  {
    path: DEFINE_ROUTES_EMPL.EMPL_ORDER_ADD,
    page: <EmplOrderAdd />
  },
  {
    path: "/employee/book/detail/:slug",
    page: <EmplAddBookPage />
  },
  {
    path: DEFINE_ROUTES_EMPL.EMPL_BOOK_ADD,
    page: <EmplAddBookPage />
  },
  {
    path: "/employee/author/detail/:slug",
    page: <EmplAuthorAdd />
  },
  {
    path: DEFINE_ROUTES_EMPL.EMPL_AUTHOR_ADD,
    page: <EmplAuthorAdd />
  },
  {
    path: "/employee/category/detail/:slug",
    page: <EmplCategoryAdd />
  },
  {
    path: DEFINE_ROUTES_EMPL.EMPL_CATEGORY_ADD,
    page: <EmplCategoryAdd />
  },
  {
    path: "/employee/publisher/detail/:slug",
    page: <EmplPublisherAdd />
  },
  {
    path: DEFINE_ROUTES_EMPL.EMPL_PUBLISHER_ADD,
    page: <EmplPublisherAdd />
  },
]