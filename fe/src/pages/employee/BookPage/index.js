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

const EmplBookPage = () => {
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
        title="Danh sách Sách"
        rightComponent={
          <ButtonCustom onClick={() => navigate(DEFINE_ROUTES_EMPL.EMPL_BOOK_ADD)}>
            Thêm sách
          </ButtonCustom>
        }
      />
      <TableV2
        searchForm={searchForm}
        searchPlaceholder="Tìm kiếm tên sách"
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
      bookId: random(0, 1000),
      title: `title ${random(0, 1000)}`,
      authors: [{ id: i, name: `author ${random(0, 1000)}` }],
      language: "vietnamese",
      price: `${random(0, 1000)}`,
      copies_available: `${random(0, 1000)}`,
    });
  }
  return listData;
};

export default EmplBookPage;