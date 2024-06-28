import { BOOK_API, CATEGORY_API } from "../../../../services/constant";
import { sendRequest } from "../../../../services/sendRequest";
import { customToast } from "../../../../toasts";

export const handleSubmitBook = async ({
  isDetail,
  formData,
  handleCloseLoading,
  handleOpenLoading,
  setTriggerReload,
}) => {
  handleOpenLoading();
  try {
    await sendRequest({
      endpoint: isDetail
        ? `${BOOK_API.EDIT}/${formData?.id}`
        : BOOK_API.ADD,
      method: isDetail ? "PUT" : "POST",
      data: {
        ...formData,
      },
    });
    customToast({
      type: "success",
      message: isDetail ? "Cập nhật thành công" : "Thêm mới thành công",
    });
    isDetail && setTriggerReload((prev) => !prev);
  } catch (error) {
    console.log(error);
    customToast({
      type: "error",
      message: error?.response?.data?.message,
    });
  } finally {
    handleCloseLoading();
  }
};
