import { toast } from "react-toastify";

const toastCss = {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored"
};

export const customToast = ({ type, message }) => {
  if (type === "success") {
    toast.success(message, toastCss);
  }
  if (type === "error") {
    toast.error(message, toastCss);
  }
  if (type === "warning") {
    toast.warning(message, toastCss);
  }
};


