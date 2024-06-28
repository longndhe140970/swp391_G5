import { Button } from "antd";
import TitlePage from "../../../components/Title";
import ManagerLayout from "../../../layout/ManagerLayout/ManagerLayout";
import InforForm from "./components/InforForm";
import InforBook from "./components/InforBook";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { customToast } from "../../../toasts";
import { sendRequest } from "../../../services/sendRequest";
import { ORDER_API } from "../../../services/constant";
import { DEFINE_ROUTES_EMPL } from "../../../routes/MenuEmpl";

const EmplOrderAdd = () => {

  const navigate = useNavigate();

  const informationFormRef = useRef();
  const informationBooksRef = useRef();

  const [loading, setLoading] = useState(false);

  const submitOrder = async () => {
    if (!informationFormRef.current) return;
    const formValue = await informationFormRef.current.formValues();
    if (!formValue) return;

    const orderData = informationBooksRef.current.getOrderData();
    if (orderData.length === 0) {
      customToast({
        type: "warning",
        message: "Vui lòng chọn sách!",
      });
      return;
    }

    const payload = {
      ...formValue,
      listOrderItem: orderData,
    };

    try {
      setLoading(true);
      const res = await sendRequest({
        method: "POST",
        endpoint: ORDER_API.ORDER_ADD,
        data: payload,
      });
      console.log("res ", res);
      customToast({
        type: "success",
        message: "Tạo đơn thành công!",
      });
      navigate(DEFINE_ROUTES_EMPL.EMPL_ORDER_LIST)
    } catch (e) {
      const message = e.response?.data?.error ?? "Thao tác không thành công!";
      customToast({
        type: "error",
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (<>
    <ManagerLayout>
      <TitlePage title="Tạo đơn hàng" />
      <div className="flex flex-col " style={{ height: "calc(100vh-150px)" }}>
        <div className="grid flex-1 grid-cols-8">
          <div className="col-span-2 pr-4 border-r">
            <p className="py-1 pl-3 text-lg font-bold border-l-4 border-blue-500 bg-gray-50">
              Thông tin khách hàng
            </p>
            <div className="py-6">
              <InforForm />
            </div>
          </div>
          <div className="col-span-6 pl-4">
            <p className="py-1 mb-6 text-lg font-bold">Thông tin sách</p>
            <div>
              <InforBook />
            </div>
          </div>
        </div>
        <div className="pt-4 pb-2 text-right border-t">
          <Button type="primary"
            loading={loading}
            onClick={submitOrder()}
          >
            Tạo đơn
          </Button>
        </div>
      </div>
    </ManagerLayout>
  </>);
}

export default EmplOrderAdd;