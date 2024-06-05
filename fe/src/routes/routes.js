import CartPage from "../pages/Cart";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login/LoginPage";
import ProfilePage from "../pages/Profile";
import SearchBookPage from "../pages/SearchBook";


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
    path: "/profile",
    page: <ProfilePage />
  },
  {
    path: "/cart",
    page: <CartPage />
  },
]