import BookCardV2 from "../../components/CardBook/CardBook";
import Section from "../../components/Section";
import MainLayout from "../../layout/MainLayout";
import BookDetailComponent from "./Components/BookDetailComponent";

const BookDetailPage = () => {
  const dataBook = {
    bookId: 1,
    title: "asdasdasdsa",
    imageUrl: "https://cdn0.fahasa.com/media/catalog/product/n/h/nha-gia-kim-b.jpg",
    authors: [
      "a", "b", "c"
    ],
    length: 12,
    language: "asdsad",
    publisher: ["a", "b", "c"],
    copies_available: 12,
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quos debitis vitae minima tenetur cupiditate repellat, labore unde in iure amet illum aliquam sit id quis corrupti tempore pariatur et?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum magnam corrupti accusantium quaerat sed magni deserunt nulla voluptas, beatae labore https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg reprehenderit ex consequatur quos  adipisci nisi alias https://w7.pngwing.com/pngs/64/514/png-transparent-flag-of-great-britain-flag-of-the-united-kingdom-english-flag-miscellaneous-angle-english-thumbnail.png sit quas molestias?Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit maxime eligendi temporibus vel repellat deserunt harum consectetur eaque molestias quaerat officia, totam est aliquid incidunt culpa https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg sed dolor? Et, qui."
  }
  return (<>
    <MainLayout>
      <Section title="Thong tin sach">
        <BookDetailComponent item={dataBook} />
      </Section>
      <Section title="Sach lien quan">
        <BookCardV2 item={dataBook} />
      </Section>
    </MainLayout>
  </>);
}

export default BookDetailPage;