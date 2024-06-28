import { useEffect, useState } from "react";
import BookCardV2 from "../../components/CardBook/CardBook";
import Section from "../../components/Section";
import MainLayout from "../../layout/MainLayout";
import BookDetailComponent from "./Components/BookDetailComponent";
import { sendRequest } from "../../services/sendRequest";
import { customToast } from "../../toasts";
import { BOOK_API } from "../../services/constant";

import { isEmpty } from "lodash"
import { useLocation, useNavigate } from "react-router-dom";
import { getBookId } from "../../utils/utils";


const BookDetailPage = () => {
  const [dataBook, setDatabook] = useState({});
  const [bookRelate, setbookRelate] = useState([])
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    const idBook = getBookId(location?.pathname);
    const fecthData = async () => {
      try {
        const dataResponse = await sendRequest({
          method: "GET",
          endpoint: `${BOOK_API.DETAIL}/${idBook}`,
        });

        setDatabook(dataResponse?.data?.data?.book)
        setbookRelate(dataResponse?.data?.data?.bookRelate)
      } catch (error) {
        customToast({ type: "error", message: error?.message || "Lỗi" });
      }
    };
    fecthData()
  }, [getBookId(location?.pathname)]);

  return (<>
    <MainLayout>
      <Section title="Thông tin sách">
        {!isEmpty(dataBook) && (<BookDetailComponent item={dataBook} />)}
      </Section>
      <Section title="Sách liên quan">
        <div className="flex flex-row justify-start gap-2 mb-8">
          {!isEmpty(bookRelate) && bookRelate?.map((el) => (<BookCardV2 item={el} handleTitleOnClick={() => {
            navigate(`/book-detail/${el?.bookId}`)
          }} />))}

        </div>
        <div className="flex justify-center mb-20">
          {isEmpty(bookRelate) && (<div className="justify-center text-lg">Không có sản phẩm liên quan</div>)}
        </div>
      </Section>
    </MainLayout>
  </>);
}

export default BookDetailPage;