import { DEFINE_ROUTES_EMPL } from "../../../routes/MenuEmpl";
import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../../components/Button/Button";
import TitlePage from "../../../components/Title";
import ManagerLayout from "../../../layout/ManagerLayout/ManagerLayout";
import TableV2 from "../../../components/TableV2";
import usePopupStore from "../../../stores/usePopupStore";
import { useEffect, useState } from "react";
import { getTableConfig } from "./config/tableConfig";
import { random } from "lodash";
import moment from "moment";

const currentDate = new Date()

const EmplOrderPage = () => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const [searchForm, setSearchForm] = useState({
    easySearch: "",
  });
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [data, setData] = useState([]);

  const handleSearchForm = (e) => {
    setSearchForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [triggerReload, setTriggerReload] = useState(false);
  const handleSearch = async () => {
  };

  useEffect(() => {
    const fetchData = () => {
      try {

        setData(getData())
      } catch (error) {

      } finally {
        handleCloseLoading();
      }
    };
    fetchData();
  }, [currentPage, triggerReload]);
  return (<>
    <ManagerLayout>
      <TitlePage
        title="Danh sách đơn hàng"
        rightComponent={
          <ButtonCustom onClick={() => navigate(DEFINE_ROUTES_EMPL.EMPL_BOOK_ADD)}>
            Thêm đơn
          </ButtonCustom>
        }
      />
      <TableV2
        searchForm={searchForm}
        searchPlaceholder="Tìm kiếm tên đăng nhập"
        handleSearchForm={handleSearchForm}
        handleSearch={handleSearch}
        columns={getTableConfig(setTriggerReload)}
        dataSource={data}
        current={currentPage}
        total={totalItems}
        pageSize={pageSize}
        handlePageChange={setCurrentPage}
      />
    </ManagerLayout>
  </>);
}

export const getData = () => {
  const listData = [];
  for (let i = 0; i < 50; i++) {
    listData.push({
      stt: i,
      orderId: random(0, 1000),
      codeOrder: `title ${random(0, 1000)}`,
      createAt: `${moment(currentDate).format('LLL')}`,
      totalQuantity: `${random(0, 1000)}`,
      totalPrice: `${random(0, 1000)} d`,
    });
  }
  return listData;
};

export default EmplOrderPage;