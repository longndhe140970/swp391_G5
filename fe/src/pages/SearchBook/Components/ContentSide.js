import CardBook from "../../../components/CardBook/CardBook";
import Section from "../../../components/Section";

const ContentSide = ({ dataBook }) => {
  return (<>
    <Section title={"Tim kiem sach"}>
      <div className="grid grid-cols-2 gap-8 mx-auto lg:grid-cols-4">
        {dataBook?.map((item) => (
          <CardBook
            item={item}
            handleTitleOnClick={() => {
              // navigate(`/book-detail?id=${item?.bookId}`);
            }}
          />
        ))}
      </div>
    </Section>

  </>);
}

export default ContentSide;