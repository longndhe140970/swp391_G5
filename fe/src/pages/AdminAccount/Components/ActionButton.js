import ButtonCustom from "../../../components/Button/Button";
import { AUTH_API } from "../../../services/constant";
import { sendRequest } from "../../../services/sendRequest";
import usePopupStore from "../../../stores/usePopupStore";
import { customToast } from "../../../toasts";

const ActionButton = ({ record, setTriggerReload }) => {

  const { handleOpenLoading, handleCloseLoading } = usePopupStore();

  const handleChangeStatus = async () => {
    try {
      handleOpenLoading();
      await sendRequest({
        method: "PUT",
        endpoint: `${AUTH_API.CHANGE_STATUS}/${record?.userId}`,
      });
      customToast({
        type: "success",
        message: "Cập nhật thành công",
      });
      setTriggerReload((prev) => !prev);
    } catch (err) {
      customToast({
        type: "error",
        message: err?.response?.data?.message,
      });
    } finally {
      handleCloseLoading();
    }
  };

  return (<>
    <div className="flex items-center justify-start gap-8">
      {record?.userStatus ? (
        <ButtonCustom type="danger" onClick={handleChangeStatus}>
          Tắt
        </ButtonCustom>
      ) : (
        <ButtonCustom type="success" onClick={handleChangeStatus}>
          Bật
        </ButtonCustom>
      )}
    </div>
  </>);
}

export default ActionButton;