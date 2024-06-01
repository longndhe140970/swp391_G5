import React from "react";

const ButtonCustom = ({ children, type = "primary", className, ...props }) => {
  const genClassName = () => {
    if (type === "primary" || type === "submit") return "bg-sky-600";
    if (type === "danger") return "bg-red-600";
    if (type === "success") return "bg-green-600";
  };
  return (
    <>
      <button
        className={`py-[5px] px-[20px] text-white rounded-[10px] font-medium ${genClassName()} ${
          className || ""
        }`}
        {...props}
      >
        {children}
      </button>
    </>
  );
};

export default ButtonCustom;