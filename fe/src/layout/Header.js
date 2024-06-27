import { isEmpty, set } from "lodash";
import React, { useEffect, useState } from "react";
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillTwitterSquare,
    AiOutlineHeart,
    AiOutlineMenu,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import useSearchStore from "../stores/useSearchStore";
import useLogout from "../hooks/useLogout";
import ButtonV2 from "../components/Button/ButtonV2";
const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    backgroundColor: '#1B3764',
    paddingTop: 10,
};

const Header = () => {

    const location = useLocation();
    const [menu, setMenu] = useState(false);
    const { user, setUser } = useAuthStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { searchData, setSearchData } = useSearchStore();
    const [searchDataNavBar, setSearchDataNavbar] = useState(searchData?.title);

    const handleChange = () => {
        setMenu(!menu);
    };
    const { handleLogout } = useLogout();
    const navigate = useNavigate();
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const handleSearchClick = () => {
        setIsSearchVisible(!isSearchVisible);
    };
    useEffect(() => {
        setSearchData(location?.state?.title);
    }, []);

    return (<>
        <div style={headerStyle}>

            <div className="flex items-center justify-between px-5 lg:px-32">
                <div className="flex items-center">
                    <Link to="/" className="mr-6 text-2xl font-semibold">
                        LMS
                    </Link>
                    <a className="mr-4">
                        <AiFillFacebook size={30} />
                    </a>
                    <a className="mr-4">
                        <AiFillTwitterSquare size={30} />
                    </a>
                    <a href="" className="mr-4">
                        <AiFillInstagram size={30} />
                    </a>
                </div>

                <nav className="items-center hidden lg:flex">
                    <Link to="/" className="mx-3 hover:text-blue-300">
                        Trang chủ
                    </Link>
                    <Link to="/search" className="mx-3 hover:text-blue-300">
                        Tìm kiếm sách
                    </Link>
                    <Link to="/about" className="mx-3 hover:text-blue-300">
                        Về chúng tôi
                    </Link>
                    <Link to="/services" className="mx-3 hover:text-blue-300">
                        Dịch vụ
                    </Link>
                    <div className="flex items-center ml-3">
                        {isEmpty(user) ? (
                            <Link to="/login" className="mr-3">
                                <AiOutlineShoppingCart size={22} />
                            </Link>

                        ) : (
                            <Link to="/cart" className="mr-3">
                                <AiOutlineShoppingCart size={22} />
                            </Link>
                        )}

                        {/* <div class="relative text-black">
              <button class="absolute left-2 -translate-y-1/2 top-1/2 p-1" onClick={() => {
                setSearchData({ title: searchDataNavBar });
                navigate(`/search-book`);
              }}>
                <svg
                  width="17"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-labelledby="search"
                  class="w-4 h-4 text-gray-700"
                >
                  <path
                    d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                    stroke="currentColor"
                    stroke-width="1.333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
              <input
                class="input rounded-full px-8 py-2 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
                placeholder="Search..."
                required=""
                id="inputSearch"
                type="text"
                value={searchDataNavBar}
                onChange={(e) => setSearchDataNavbar(e.target.value)}
              />
              <button type="reset" class="absolute right-3 -translate-y-1/2 top-1/2 p-1" onClick={() => {
                const inputElement = document.getElementById('inputSearch');
                inputElement.value = '';
              }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div> */}



                        {/* {isSearchVisible && (
              <div className="absolute flex items-center justify-center p-2 mt-2 bg-white border border-gray-300 rounded top-14 right-32">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-2 py-1 ml-2 text-black border border-gray-300 rounded"
                  value={searchDataNavBar}
                  onChange={(e) => setSearchDataNavbar(e.target.value)}
                />
                <button className="text-black">
                  <AiOutlineSearch
                    size={22}
                    onClick={() => {
                      setSearchData({ title: searchDataNavBar });
                      navigate(`/search-book`);
                    }}
                  />
                </button>
              </div>
            )} */}
                    </div>

                    {isEmpty(user) ? (
                        <Link to="/login" className="ml-3">
                            <ButtonV2 title="Đăng nhập" />
                        </Link>
                    ) : (
                        <div className="ml-3">
                            <div
                                className="cursor-pointer group-item"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                {user?.username}
                                {isDropdownOpen && (
                                    <div className="absolute p-2 mt-2 text-black bg-white border border-solid rounded top-14 right-32">
                                        <ul>
                                            <li>
                                                <Link to="/profile">Thông tin cá nhân</Link>
                                            </li>
                                            <li>
                                                <Link to="/favorite">Sách yêu thích</Link>
                                            </li>
                                            <li>
                                                <Link to="/history">Lịch sử mua hàng</Link>
                                            </li>
                                            <li className="border border-black"></li>
                                            <li>
                                                <button onClick={handleLogout}>Đăng xuất</button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </nav>

                <div className="block lg:hidden" onClick={handleChange}>
                    <AiOutlineMenu size={30} />
                </div>
            </div>

            <div className={`lg:hidden ${menu ? "block" : "hidden"}`}>
                <Link to="/" className="block px-4 hover:text-blue-300">
                    Trang chủ
                </Link>
                <Link
                    to="/search"
                    className="block px-4 hover:text-blue-300"
                >
                    Tìm kiếm sách
                </Link>
                <Link to="/courses" className="block px-4 hover:text-blue-300">
                    Về chúng tôi
                </Link>
                <Link to="/reviews" className="block px-4 hover:text-blue-300">
                    Dịch vụ
                </Link>

            </div>
        </div>

    </>);
}

export default Header;