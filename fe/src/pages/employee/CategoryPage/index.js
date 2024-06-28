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
import { sendRequest } from "../../../services/sendRequest";
import { CATEGORY_API } from "../../../services/constant";
import { renderStt } from "../../../utils/utils";

const EmplCategoryPage = () => {
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
          endpoint: searchText ? CATEGORY_API.SEARCH : CATEGORY_API.LIST,
          params: {
            "index-page": currentPage,
          },
          data: {
            searchText,
          },
        });

        const responseData = dataResponse?.data?.data?.searchList;
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
  }, [currentPage, searchText]);
  return (<>
    <ManagerLayout>
      <TitlePage
        title="Danh sách danh mục"
        rightComponent={
          <ButtonCustom onClick={() => navigate(DEFINE_ROUTES_EMPL.EMPL_CATEGORY_ADD)}>
            Thêm danh mục
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
      authorId: random(0, 1000),
      name: `cate ${random(0, 1000)}`,
    });
  }
  return listData;
};

export default EmplCategoryPage;