import { constant } from "lodash";
import BookCardV2 from "../../components/CardBook/CardBook";
import Section from "../../components/Section";
import MainLayout from "../../layout/MainLayout";
import BookDetailComponent from "./Components/BookDetailComponent";
import { sendRequest } from "../../services/sendRequest";

const BookDetailPage = () => {
  const dataBook = {
    bookId: 1,
    title: "Nhà giả kim",
    imageUrl: "https://cdn0.fahasa.com/media/catalog/product/n/h/nha-gia-kim-b.jpg",
    authors: ["Paulo Coelho"],
    length: 12,
    language: "Tiếng Việt",
    publisher: ["NXB Hội Nhà Văn"],
    copies_available: 12,
    description: "Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ và con người. Tiểu thuyết Nhà giả kim của Paulo Coelho như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông."
  }
     
  return (<>
    <MainLayout>
      <Section title="Thông tin sách">
        <BookDetailComponent item={dataBook} />
      </Section>
      <Section title="Sách liên quan">
        <BookCardV2 item={dataBook} />
      </Section>
    </MainLayout>
  </>);
}

export default BookDetailPage;