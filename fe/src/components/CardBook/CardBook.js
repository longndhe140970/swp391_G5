import { Card } from "antd";
import React from "react";

const { Meta } = Card;
const BookCardV2 = ({ item, handleTitleOnClick, ...props }) => {
  return (
    <>
      {/* <div
        className={`w-[100%] bg-white rounded-md shadow-2xl mb-[20px] min-h-[360px] relative flex flex-col ${!item?.copies_available && "opacity-30"
          }`}
      >
        <div className="px-[20px] h-[85%]">
          <img
            className="mx-auto object-cover h-[60%]"
            src={item?.imageUrl}
            alt={item?.title}
          />
          <h3
            className="font-bold text-center text-[20px] my-[10px] line-clamp-1 cursor-pointer"
            onClick={handleTitleOnClick}
          >
            {item?.title}
          </h3>
          <p className="mt-3 text-start text-slate-400 mb-3 leading-6 max-h-[94px] text-[16px] line-clamp-2 min-h-[48px]">
            {item?.description}
          </p>
        </div>
      </div> */}
      <Card
        hoverable
        style={{
          width: 240,
          opacity: !item?.copies_available && "0.3"
        }}
        onClick={handleTitleOnClick}
        cover={
          <img alt={item?.title} src={item?.imageUrl} className="max-h-[240px]" />
        }
      >
        <Meta
          title={<h3 className="font-bold text-[20px]">{item?.title}</h3>}
          description={
            <p className="text-[16px]">
              {item.description.length > 35
                ? `${item.description.slice(0, 35) + "..."}`
                : item.description}
            </p>
          }
        />
      </Card>
    </>
  );
};

export default BookCardV2;
