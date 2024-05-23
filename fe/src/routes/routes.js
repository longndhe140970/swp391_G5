import HomePage from "../pages/Home";
import SearchBookPage from "../pages/SearchBook";
import SignInPage from "../pages/Signin";


export const ConfigRotues = [
  {
    path: "/",
    page: <HomePage />
  }, {
    path: "/login",
    page: <SignInPage />
  },
  {
    path: "/search",
    page: <SearchBookPage />
  }
]