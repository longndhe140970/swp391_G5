import React from "react";

const BookCardV2 = ({ item, handleTitleOnClick, ...props }) => {
  return (
    <>
      <div
        className={`w-[100%] bg-white shadow-2xl mb-[20px] relative flex flex-col ${!item?.copies_available && "opacity-30"
          }`}
      >
        <div className="px-[30px] h-[85%]">
          <img
            className="mx-auto object-cover h-[60%]"
            src={item?.imageUrl}
            alt={item?.title}
          />
          <h3
            className="font-bold text-center text-[20px] my-[30px] line-clamp-1 cursor-pointer"
            onClick={handleTitleOnClick}
          >
            {item?.title}
          </h3>
          <p className="mt-3 text-start text-slate-400 mb-3 leading-6 max-h-[94px] text-[#969aa0] text-[16px] line-clamp-2 min-h-[48px]">
            {item?.description}
          </p>
        </div>
        {/* <div className="bg-[#ffedd5] mt-[30px] w-[100%] flex bottom-0 h-[10%] py-[5px]">
          <div className="w-[50%] flex justify-center items-center">
            <div className="w-[20px] h-[20px] bg-green-500 mr-[5px] rounded-[50px]"></div>
            {item?.like || 0}
          </div>
          <div className="w-[50%] text-center flex justify-center items-center">
            <div className="w-[20px] h-[20px] bg-red-500 mr-[5px] rounded-[50px]"></div>
            {item?.dislike || 0}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default BookCardV2;
