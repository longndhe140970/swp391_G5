
import { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { sendRequest } from "../../services/sendRequest";
import { customToast } from "../../toasts";
import Section from "../../components/Section";
import CardBook from "../../components/CardBook/CardBook";
import CustomPagination from "../../components/Pagination";
import { ORDER_API } from "../../services/constant";
import { isEmpty } from "lodash";
import {  useNavigate } from "react-router-dom";

const HistoryPage = () => {
    const [dataBook, setDataBook] = useState();
    const [indexPage, setIndexPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const dataResponse = await sendRequest({
                    method: "GET",
                    endpoint: `${ORDER_API.HISTORY}?index-page=${indexPage}`,
                });
                const { content, size, totalElements, page } =
                    dataResponse?.data?.data?.purchaseList;
                setIndexPage(page);
                setDataBook(content);
                setPageSize(size);
                setTotalItems(totalElements);
            } catch (error) {
                customToast({ type: "error", message: "Không tìm thấy sách" });
                setIndexPage(1);
                setDataBook([]);
                setPageSize(0);
                setTotalItems(0);
            }
        };
        fetchBookData();
    }, [indexPage]);

    return (<>
        <MainLayout>
            <div className="flex flex-col">
                <Section title={"Lịch sử mua hàng"}>

                    {!isEmpty(dataBook) && (<div className="grid grid-cols-2 gap-8 mx-auto lg:grid-cols-4">
                        {dataBook?.map((item) => (
                            // console.log(item)
                            <CardBook
                                item={item.bookDto}
                                handleTitleOnClick={() => {
                                    navigate(`/book-detail/${item?.bookDto.bookId}`);
                                }}
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

export default HistoryPage;