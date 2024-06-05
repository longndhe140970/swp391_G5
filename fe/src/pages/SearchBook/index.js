import React from "react";
import { Layout } from "antd";
import MainLayout from "../../layout/MainLayout";
import Menuside from "./Components/MenuSide";
import { useEffect, useState } from "react";
import usePopupStore from "../../stores/usePopupStore";
import { sendRequest } from "../../services/sendRequest";
import { BOOK_API } from "../../services/constant";
import { customToast } from "../../toasts";
import ContentSide from "./Components/ContentSide";
import CustomPagination from "../../components/Pagination";
import MenuSection from "./Components/MenuSection";
import CheckBox from "../../components/Checkbox";
import { FaSearch } from "react-icons/fa";
const { Sider, Content } = Layout;

const contentStyle = {
  textAlign: 'center',
  minHeight: '120px',
  lineHeight: '80px',
  backgroundColor: '#fff',
};
const siderStyle = {
  paddingLeft: '20px',
  textAlign: 'center',
  lineHeight: '60px',
  backgroundColor: '#fff',
};


const SearchBookPage = () => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const [titleSearch, setTitle] = useState("");

  const handleSearch = () => {
    setSearchData({ title: titleSearch });
  };
  const [dataBook, setDataBook] = useState();
  const [indexPage, setIndexPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [listPublisher, setListPublisher] = useState([]);
  const [listAuthor, setListAuthor] = useState([]);
  const [listLanguage, setListLanguage] = useState([]);
  const [listCategory, setListCategory] = useState([]);


  const [searchData, setSearchData] = useState({
    title: "",
    category: "",
    language: "",
    author: "",
    publisher: "",
    price: 1,
  });

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const dataResponse = await sendRequest({
          method: "POST",
          endpoint: `${BOOK_API.SEARCH_BOOK}?index-page=${indexPage}`,
          data: searchData,
        });
        console.log('searchData :>> ', searchData);
        const { content, size, totalElements, page } =
          dataResponse?.data?.data?.searchList;
        setListPublisher(dataResponse?.data?.data?.listPublisher);
        setListAuthor(dataResponse?.data?.data?.listAuthor);
        setListCategory(dataResponse?.data?.data?.listCategory);
        setListLanguage(dataResponse?.data?.data?.listLanguage);
        setIndexPage(page);
        setDataBook(content);
        setPageSize(size);
        setTotalItems(totalElements);

      } catch (error) {
        customToast({ type: "error", message: "Khong tim thay sach" });
        setIndexPage(1);
        setDataBook([]);
        setPageSize(0);
        setTotalItems(0);
      }
    };
    fetchBookData();
  }, [searchData, indexPage]);

  return (<>
    <MainLayout>
      <Layout>
        <Sider style={siderStyle} width="15%">
          {/* <Menuside searchData={searchData} setSearchData={setSearchData} listPublisher={listPublisher} listAuthor={listAuthor} listLanguage={listLanguage} listCategory={listCategory} /> */}
          <>
            <MenuSection style={{
              padding: "0px 0px 5px 0px",
              marginTop: "30px",
              borderTop: "none"
            }}>
              <div className="flex justify-between border rounded">
                <input
                  type="text"
                  placeholder="ten sach"
                  className="p-1 ml-2 text-black max-h-10 min-w-5"
                  value={titleSearch}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button className="mr-2 text-black hover:cursor-pointer min-w-2">
                  <FaSearch
                    size={22}
                    onClick={handleSearch}
                  />
                </button>
              </div>
            </MenuSection>
            <MenuSection title={"Ten danh muc"}>
              <>
                {listCategory?.map?.((category) => (
                  <CheckBox
                    id={category?.categoryId}
                    label={category?.name}
                    value={category?.name}
                    onClick={() =>
                      setSearchData({
                        category:
                          searchData?.category === category?.name
                            ? ""
                            : category?.name,
                      })
                    }
                    checked={searchData?.category === category?.name}
                  />
                ))}
              </>
            </MenuSection>
            <MenuSection title={"Ngon ngu"}>
              <>
                {listLanguage?.map?.((language) => (
                  <CheckBox
                    id={language?.languageId}
                    label={language?.name}
                    value={language?.name}
                    onClick={() =>
                      setSearchData({
                        language:
                          searchData?.language === language?.name
                            ? ""
                            : language?.name,
                      })
                    }
                    checked={searchData?.language === language?.name}
                  />
                ))}
              </>
            </MenuSection>
            <MenuSection title={"tac gia"}>
              <>
                {listAuthor?.map?.((author) => (
                  <CheckBox
                    id={author?.publisherId}
                    label={author?.name}
                    value={author?.name}
                    onClick={() =>
                      setSearchData({
                        author:
                          searchData?.author === author?.name
                            ? ""
                            : author?.name,
                      })
                    }
                    checked={searchData?.author === author?.name}
                  />
                ))}
              </>
            </MenuSection>
            <MenuSection title={"Nha xuat ban"}
              style={{
                borderBottom: "none"
              }}
            >
              <>
                {listPublisher?.map?.((publisher) => (
                  <CheckBox
                    id={publisher?.publisherId}
                    label={publisher?.name}
                    value={publisher?.name}
                    onClick={() =>
                      setSearchData({
                        publisher:
                          searchData?.publisher === publisher?.name
                            ? ""
                            : publisher?.name,
                      })
                    }
                    checked={searchData?.publisher === publisher?.name}
                  />
                ))}
              </>
            </MenuSection>
            {/* <MenuSection title={"Gia"}>

            </MenuSection> */}
          </>
        </Sider>
        <Content style={contentStyle}>
          <div className="flex flex-col">
            <ContentSide dataBook={dataBook} />
            <div className="flex justify-center my-[50px] mr-[10px]">
              <CustomPagination
                onChange={setIndexPage}
                current={indexPage}
                pageSize={pageSize}
                total={totalItems}
              />
            </div>
          </div>
        </Content>
      </Layout>
    </MainLayout>
  </>);
}

export default SearchBookPage;