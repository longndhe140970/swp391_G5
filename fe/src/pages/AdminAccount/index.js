import { useEffect, useState } from "react";
import ButtonCustom from "../../components/Button/Button";
import TableV2 from "../../components/TableV2";
import TitlePage from "../../components/Title";
import ManagerLayout from "../../layout/ManagerLayout/ManagerLayout";
import usePopupStore from "../../stores/usePopupStore";
import { useNavigate } from "react-router-dom";
import { getTableConfig } from "./config/tableConfig";
import { random } from "lodash";
import { renderStt } from "../../utils/utils";
import { sendRequest } from "../../services/sendRequest";
import { AUTH_API } from "../../services/constant";

const AdminAccountPage = () => {

  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const [searchForm, setSearchForm] = useState({
    easySearch: "",
  });
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [data, setData] = useState([]);

  const handleSearchForm = (e) => {
    setSearchForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [triggerReload, setTriggerReload] = useState(false);
  const handleSearch = () => {
    setSearchText(searchForm?.easySearch);
    setCurrentPage(1);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResponse = await sendRequest({
          method: searchText ? "POST" : "GET",
          endpoint: searchText ? AUTH_API.SEARCH : AUTH_API.LIST,
          params: {
            "index-page": currentPage,
          },
          data: {
            searchText,
          },
        });
        const responseData = dataResponse?.data?.data?.searchList;
        console.log(responseData);
        const { content, totalElements, totalPage, size } = responseData;

        const updatedData = content?.map?.((el, index) => ({
          stt: renderStt(index, currentPage, size),
          ...el,
        }));

        setData(updatedData)
        setTotalItems(totalElements)
        setPageSize(size)

      } catch (error) {

      } finally {
        handleCloseLoading();
      }
    };
    fetchData();
  }, [currentPage, searchText, triggerReload]);

  return (<>
    <ManagerLayout>
      <TitlePage
        title="Danh sách nhân viên"
        rightComponent={<ButtonCustom>Thêm nhân viên</ButtonCustom>}
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
      userId: random(0, 1000),
      username: `username ${random(0, 1000)}`,
      userStatus: true,
      fullName: `Edward King ${i}`,
    });
  }
  return listData;
};

export default AdminAccountPage;