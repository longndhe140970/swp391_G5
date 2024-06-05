import { CART_API } from "../../../services/constant";
import { sendRequest } from "../../../services/sendRequest";
import usePopupStore from "../../../stores/usePopupStore";
import { customToast } from "../../../toasts";
import { getErrorMessage } from "../../../utils/utils";

const useOrderHooks = ({ record, setReloadData }) => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const handleDeleteCart = async () => {
    try {
      handleOpenLoading();
      await sendRequest({
        method: "DELETE",
        endpoint: `${CART_API.CART_LIST}/${record?.cartItemId}`,
      });
      customToast({
        type: "success",
        message: "Xóa thành công",
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
  const handleUpdateCartOrder = async (record) => {
    try {
      handleOpenLoading();
      await sendRequest({
        method: "PUT",
        endpoint: `${CART_API.CART_LIST}/${record?.cartItemId}?quantity=${record.quantity}`,
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

  const handleMinus = async () => {
    if (record?.quantity === 1) {
      await handleDeleteCart(record?.cartItemId);
    } else {
      await handleUpdateCartOrder({
        cartItemId: record?.cartItemId,
        quantity: record?.quantity - 1,
      });
    }
  };
  const handlePlus = async () => {
    await handleUpdateCartOrder({
      cartItemId: record?.cartItemId,
      quantity: record?.quantity + 1,
    });
  };
  return {
    handleMinus,
    handlePlus,
    handleDeleteCart,
    handleUpdateCartOrder,
  };
};

export default useOrderHooks;