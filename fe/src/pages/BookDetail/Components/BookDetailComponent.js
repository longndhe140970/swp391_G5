


import { useNavigate } from "react-router-dom";
import usePopupStore from "../../../stores/usePopupStore";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import ReadMore from "../../../components/ReadMore";
import { Rate } from "antd";
import { sendRequest } from "../../../services/sendRequest";
import { BOOK_API, CART_API, FAVORITE_API } from "../../../services/constant";
import { customToast } from "../../../toasts";
import { AiFillHeart } from "react-icons/ai";

const BookDetailComponent = ({ item }) => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();

  const navigate = useNavigate()
  const [rate, setRate] = useState(0);
  const [like, setLike] = useState(false);


  const handleToCart = async () => {
    try {
      handleOpenLoading();
      await sendRequest({
        method: "PUT",
        endpoint: `${CART_API.CART_ADD}`,
        data: {
          bookId: item?.bookId,
          quantity: 1,
        },
      });
      customToast({
        type: "success",
        message: "Đã thêm vào giỏ hàng",
      });
    } catch (error) {
      customToast({
        type: "error",
        message: error?.message,
      });
    } finally {
      handleCloseLoading();
    }
  };

  const handleBuy = async () => {
    try {
      handleOpenLoading();
      await sendRequest({
        method: "PUT",
        endpoint: `${CART_API.CART_ADD}`,
        data: {
          bookId: item?.bookId,
          quantity: 1,
        },
      });
      customToast({
        type: "success",
        message: "Đã thêm vào giỏ hàng",
      });
      navigate("/cart")
    } catch (error) {
      customToast({
        type: "error",
        message: error?.message,
      });
    } finally {
      handleCloseLoading();
    }

  };

  const handleRate = async (rateValue) => {
    try {
      const dataResponse = await sendRequest({
        method: "POST",
        endpoint: `${BOOK_API.RATE}`,
        data: {
          bookId: item?.bookId,
          rating: rateValue
        }
      });
      setRate(rateValue);
      if (dataResponse.status >= 200 || dataResponse.status < 300) {
        customToast({ type: "success", message: dataResponse.data.message || "Thành công" });
      }
    } catch (error) {
      customToast({ type: "error", message: "Bạn chưa mua sản phẩm này" || error?.message });
    }
  };
  const handleFavorite = async () => {
    try {
      const dataResponse = await sendRequest({
        method: "PUT",
        endpoint: `${FAVORITE_API.EDIT}`,
        data: {
          bookId: item?.bookId,
          favorite: !like
        }
      });
      if (dataResponse?.data?.status === 200 ) {
        customToast({ type: "success", message: dataResponse.data.message || "Thành công" });
        setLike(!like);
      } else {
        customToast({ type: "error", message: dataResponse.data.message || "T" });
        setLike(!like);
      }

    } catch (error) {
      customToast({ type: "error", message: "Bạn hãy đăng nhập để thích sản phẩm" });
    }
  };

  useEffect(() => {
    setRate(item?.rate)
    setLike(item?.liked)
  }, [item?.rate, item?.liked]);

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
            Số trang:<span className="ml-[10px]">{item?.page}</span>
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
              value={item?.rate}
              onChange={(e) => {
                handleRate(e);
              }}
            />
            <p className="ml-3">({item?.totalRate})</p>
          </div>
          <div className=" mt-[10px]">
            <div>
              <span className="mr-[10px]">Sản phẩm có sẵn:</span>
              <span className="text-green-500">
                {item?.copies_available}
              </span>
            </div>
          </div>
          <div className="flex justify-between mt-[20px]">
            <button
              class="hover:bg-yellow-600 font-bold rounded-md py-3 px-6 bg-yellow-500 w-[175px] text-white mr-5"
              onClick={handleBuy}
            >
              Mua ngay
            </button>
            <button
              class="hover:bg-red-600 font-bold rounded-md py-3 px-6 bg-red-500 text-white w-[175px] text-wrap "
              onClick={handleToCart}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
        <div>
          {like ? (
            <AiFillHeart
              onClick={handleFavorite}
              style={{
                fontSize: 30,
                color: "red",
              }}
            />
          ) : (
            <AiFillHeart
              onClick={handleFavorite}
              style={{
                fontSize: 30,
                color: "gray"
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