import { useEffect, useState } from "react";
import TableCustom from "../../components/Table/Table";
import MainLayout from "../../layout/MainLayout";
import usePopupStore from "../../stores/usePopupStore";
import { sendRequest } from "../../services/sendRequest";
import { customToast } from "../../toasts";
import { getErrorMessage } from "../../utils/utils";
import { CART_API, ORDER_API } from "../../services/constant";
import { tableCartConfig } from "./Components/tableConfig";

const CartPage = () => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const [responseData, setResponseData] = useState();
  const [reloadData, setReloadData] = useState();

  useEffect(() => {
    const getListCart = async () => {
      try {
        handleOpenLoading();
        const dataResponse = await sendRequest({
          method: "GET",
          endpoint: `${CART_API.CART_LIST}`,
        });
        const { cartItemDtos, totalPrice } = dataResponse?.data?.data?.cart;

        setResponseData({
          listDataCart: cartItemDtos?.map?.((el) => ({
            ...el
          })),
          totalPrice,
        });
      } catch (error) {
        customToast({
          type: "error",
          message: getErrorMessage(error),
        });
      } finally {
        handleCloseLoading();
      }
    };
    getListCart();
  }, [reloadData]);

  const handleConfirmOrder = async () => {
    try {
      handleOpenLoading();
      await sendRequest({
        method: "POST",
        endpoint: `${ORDER_API.ORDER_ADD}`,
        data: {
          listOrderItem: responseData?.listDataCart?.map?.((item) => ({
            ...item,
            cartItemId: item?.cartId,
          })),
        },
      });

      customToast({
        type: "success",
        message: "Thanh toán thành công",
      });
      setReloadData((prev) => !prev);
    } catch (error) {
      customToast({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      handleCloseLoading();
    }
  };

  return (<>
    <MainLayout>
      <div className="pt-[200px] mx-auto max-w-7xl">
        <div className="w-[100%]">
          <TableCustom
            noSearchDataTable
            noPagination
            dataSource={responseData?.listDataCart}
            columns={tableCartConfig(setReloadData)}
          />
        </div>
        <div className="flex justify-end">
          <div className="mt-10">
            <div>
              <p className="mb-5">
                Tổng tiền :{" "}
                {responseData?.listDataCart?.reduce((acc, cur) => {
                  return acc + cur?.price;
                }, 0)}
                đ
              </p>
              <button
                className="px-6 py-3 font-bold text-white rounded-full hover:brightness-110 hover:animate-pulse bg-gradient-to-r from-orange-200 to-red-500"
                onClick={handleConfirmOrder}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  </>);
}

export default CartPage;