import React, { useState } from 'react';
import { customToast } from '../../toasts';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import { setLocalStorageKey } from '../../utils/utils';
import { TOKEN_EXPIRED_TIME, TOKEN_STORAGE } from '../../utils/constants';
import { USER_ROLE } from '../../roles';
import { sendRequest } from '../../services/sendRequest';
import { AUTH_API } from '../../services/constant';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';

const LoginPage = () => {

    const navigate = useNavigate();
    const { setUser } = useAuthStore();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {

            const dataResponse = await sendRequest({
                method: 'POST',
                endpoint: `${AUTH_API.LOGIN}`,
                data: {
                    username: username,
                    password: password
                }
            });

            const statusCode = dataResponse?.status;
            if (statusCode === 200) {
                const responseData = dataResponse?.data?.data || {};
                const userData = responseData?.user || {};
                const userId = responseData?.userID;
                const userRole = userData?.role;
                setUser({
                    ...userData,
                    userID: userId,
                    roles: userData?.role,
                });
                const { token, expireDate } = dataResponse?.data?.data;
                setLocalStorageKey(TOKEN_STORAGE, token?.replace("Bearer ", ""));
                setLocalStorageKey(TOKEN_EXPIRED_TIME, expireDate);
                customToast({
                    type: "success",
                    message: "Đăng nhập thành công",
                });

                if (userRole === USER_ROLE.ROLE_EMPLOYEE) {
                    navigate("/employee/customer/list");
                } else {
                    navigate("/");
                }
            } else {
                const errorMessage = dataResponse?.data?.error || "Đăng nhập thất bại";
                customToast({
                    type: "error",
                    message: errorMessage,
                });
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message;
            customToast({ type: "error", message: errorMessage ?? "Dang nhap khong thanh cong" });
        }
    }

    return (
        <>
            <Header />
            <div class="flex flex-col items-center justify-center w-full h-[70vh] ">
                <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">Đăng nhập</h2>
                    <form class="flex flex-col" onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            class="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="Tên đăng nhập"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <input
                            type="password"
                            class="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <div class="flex items-center justify-between flex-wrap">
                            <a href="#" class="text-sm text-blue-500 hover:underline mb-0.5 mt-4">Quên mật khẩu?</a>
                            <p class="text-gray-900 mt-4">Chưa có tài khoản? <a href="/signup" class="text-sm text-blue-500 -200 hover:underline mt-4">Đăng ký</a></p>
                        </div>
                        <button
                            type="submit"
                            class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default LoginPage;