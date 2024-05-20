import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

const useLogout = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({});
    localStorage.clear();
    navigate("/login");
  };
  return { handleLogout };
};

export default useLogout;
