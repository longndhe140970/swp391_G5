import { CATEGORY_API } from "../../../../services/constant";
import { sendRequest } from "../../../../services/sendRequest";
import { customToast } from "../../../../toasts";

export const handleSubmitCategory = async ({
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
        ? `${CATEGORY_API.EDIT}?id=${formData?.id}`
        : CATEGORY_API.ADD,
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
