


import { useNavigate } from "react-router-dom";
import usePopupStore from "../../../stores/usePopupStore";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import ReadMore from "../../../components/ReadMore";
import { Rate } from "antd";

const BookDetailComponent = ({ item }) => {

  const navigate = useNavigate();
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();

  const [like, setLike] = useState(false);
  useEffect(() => {
  },);
  const handleBorrow = async () => {
  };
  const handleRate = async (rateValue) => {
  };
  const handleFavorite = async () => {

  };
  return (<>
    <div className="flex flex-wrap gap-8">
      <div className="w-[30%] ml-[20px]">
        <img
          className="w-[100%] object-cover rounded-[50px]"
          src={item?.imageUrl}
          alt={item?.title}
        />
      </div>
      <div className="ml-[10px] w-[60%] flex gap-10">
        <div className="w-[65%]">
          <h2 className="text-3xl font-bold">{item?.title}</h2>
          <h3 className="text-3xl pt-[10px] pb-[15px]">{item?.subTitle}</h3>
          <p>
            Tác giả:{" "}
            {item?.authors?.map((item, index) => (
              <span
                className="text-cyan-600 ml-[10px] cursor-pointer"
              >
                {item},
              </span>
            ))}
          </p>

          <p>
            Số trang:<span className="ml-[10px]">{item?.length}</span>
          </p>
          <p>
            Ngôn ngữ:<span className="ml-[10px]">{item?.language}</span>
          </p>
          <p>
            Nhà phát hành:
            <span
              className="text-cyan-600 ml-[10px] cursor-pointer"
            >
              {item?.publisher}
            </span>
          </p>
          <div className="flex mt-[10px]">
            <p className="mr-[10px]">Đánh giá</p>
            <Rate
              value={2}
              onChange={(e) => {
                handleRate(e);
              }}
            />
            <p className="ml-3">{`(250)`}danh gia</p>
          </div>
          <div className=" mt-[10px]">
            <div>
              <span className="mr-[10px]">Trong kho con:</span>
              <span className="text-green-500">
                {item?.copies_available}
              </span>
            </div>
          </div>
          <div className="flex justify-between mt-[20px]">
            <button
              class="hover:bg-yellow-600 font-bold rounded-md py-3 px-6 bg-yellow-500 w-[175px] text-white mr-5"
              onClick={handleBorrow}
            >
              Mua ngay
            </button>
            <button
              class="hover:bg-red-600 font-bold rounded-md py-3 px-6 bg-red-500 text-white w-[175px] text-wrap "
              onClick={handleBorrow}
            >
              Them vao gio hang
            </button>
          </div>
        </div>
        <div>
          {like ? (
            <FaRegHeart
              onClick={handleFavorite}
              style={{
                fontSize: 30,
                color: "red",
              }}
            />
          ) : (
            <FaRegHeart
              onClick={handleFavorite}
              style={{
                fontSize: 30,
              }}
            />
          )}
        </div>
      </div>
      <div className="w-[100%] mx-[20px]">
        <p className="text-center bg-gray-100 py-[15px] font-bold mb-[10px]">
          Mô tả sản phẩm Sách - {item?.title} - Tái bản mới nhất 2023, Sbooks
        </p>
        <ReadMore data={item?.description} />
      </div>
    </div>
  </>);
}

export default BookDetailComponent;