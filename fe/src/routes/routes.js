import HomePage from "../pages/Home";
import LoginPage from "../pages/Login/LoginPage";
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
  }
]