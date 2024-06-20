import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";
import useLogout from "../../../hooks/useLogout";
import { USER_ROLE } from "../../../roles/index";
import { MenuAdmin } from "../../../routes/MenuAdmin"
import { MenuEmpl } from "../../../routes/MenuEmpl"

const SideBar = () => {
  const location = useLocation();
  const { user } = useAuthStore();
  const { handleLogout } = useLogout();

  return (
    <>
      <div className="w-full overflow-auto">
        <div className="px-5 py-[10px] flex flex-wrap gap-10 bg-[#1B3764] items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5jTKo4WuNTHYrShmskUJXipMid-jcnrAfAQ&s"
            className="w-[50px] h-[50px] rounded-[50%]"
            alt="avatar"
          />
          <span className="font-bold text-white">Xin chao {user?.username}</span>
        </div>
        <div className="mt-[20px]">
          {(user?.roles === USER_ROLE.ROLE_EMPLOYEE
            /* ? MenuEmpl
            : MenuAdmin */
            ? MenuAdmin
            : MenuEmpl
          )?.map?.((el) => (
            <>
              <Link
                className={`p-5 block no-underline cursor-pointer text-start py-[15px] bg-[#1B3764]  font-bold mb-[15px] ${location?.pathname?.includes(el?.activePath)
                  ? "text-white bg-blue-700 rounded-md"
                  : "opacity-50 text-gray-300"
                  }`}
                to={el?.path}
              >
                {el?.title}
              </Link>
            </>
          ))}
          <Link
            className={`block no-underline p-5  cursor-pointer py-[15px] text-start bg-[#1B3764]  font-bold mb-[15px] opacity-50 text-gray-400`}
            to="/login"
            onClick={handleLogout}
          >
            Đăng xuất
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;