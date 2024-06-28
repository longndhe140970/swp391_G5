
import { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { sendRequest } from "../../services/sendRequest";
import { customToast } from "../../toasts";
import { FAVORITE_API } from "../../services/constant";
import Section from "../../components/Section";
import CardBook from "../../components/CardBook/CardBook";
import CustomPagination from "../../components/Pagination";
import RemoveButton from "./Components/RemoveButton";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

const FavoritePage = () => {
    const [dataBook, setDataBook] = useState();
    const [indexPage, setIndexPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const navigate = useNavigate()

    const handleRemoveFavorite =  (item) => {
        try {
            const dataResponse =  sendRequest({
                method: "PUT",
                endpoint: `${FAVORITE_API.EDIT}`,
                data: {
                    bookId: item?.bookId,
                    favorite: false
                }
            });
            if (dataResponse.status >= 200 || dataResponse.status < 300) {
                customToast({ type: "success", message: dataResponse.data.message || "Thành công" });
                setTotalItems(totalItems - 1);
            }
        } catch (error) {
            customToast({ type: "error", message: error?.message || "Lỗi" });
        }
    }

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const dataResponse = await sendRequest({
                    method: "GET",
                    endpoint: `${FAVORITE_API.LIST}?index-page=${indexPage}`,
                });
                const { content, size, totalElements, page } =
                    dataResponse?.data?.data?.favoriteList;
                    console.log(dataResponse)
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
    }, [indexPage, totalItems]);

    return (<>
        <MainLayout>
            <div className="flex flex-col">
                <Section title={"Sách yêu thích"}>
                    {!isEmpty(dataBook) && (<div className="grid grid-cols-2 gap-8 mx-auto lg:grid-cols-4">
                        {dataBook?.map((item) => (
                            <CardBook
                                item={item}
                                actions={[
                                    <RemoveButton title="Xóa" onClick={
                                        async () => {
                                            try {
                                                const dataResponse = await sendRequest({
                                                    method: "PUT",
                                                    endpoint: `${FAVORITE_API.EDIT}`,
                                                    data: {
                                                        bookId: item?.bookId,
                                                        favorite: false
                                                    }
                                                });
                                                if (dataResponse.status >= 200 || dataResponse.status < 300) {
                                                    customToast({ type: "success", message: dataResponse.data.message || "Thành công" });
                                                    setTotalItems(totalItems - 1);
                                                }
                                            } catch (error) {
                                                customToast({ type: "error", message: error?.message || "Lỗi" });
                                            }}
                                    }></RemoveButton>
                                ]}
                            />

                        ))}
                    </div>)}
                    <div className="flex justify-center mb-20">
                        {isEmpty(dataBook) && (<div className="justify-center text-lg">Không có sản phẩm liên quan</div>)}
                    </div>
                </Section>
                {!isEmpty(dataBook) && (<div className="flex justify-center my-[50px] mr-[10px]">
                    <CustomPagination
                        onChange={setIndexPage}
                        current={indexPage}
                        pageSize={pageSize}
                        total={totalItems}
                    />
                </div>)}
                
            </div>
        </MainLayout>
    </>);
}

export default FavoritePage;