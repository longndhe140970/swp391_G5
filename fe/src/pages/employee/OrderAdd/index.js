import { Button } from "antd";
import TitlePage from "../../../components/Title";
import ManagerLayout from "../../../layout/ManagerLayout/ManagerLayout";
import InforForm from "./components/InforForm";
import InforBook from "./components/InforBook";

const EmplOrderAdd = () => {
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
            loading={true}
          >
            Tạo đơn
          </Button>
        </div>
      </div>
    </ManagerLayout>
  </>);
}

export default EmplOrderAdd;