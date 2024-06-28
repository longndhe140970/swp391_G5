import { useNavigate } from "react-router-dom";
import BookCardV2 from "../../../components/CardBook/CardBook";
import Section from "../../../components/Section";

const ContentSide = ({ dataBook }) => {
  const navigate = useNavigate()
  return (<>
    <Section title={"Tìm kiếm sách"}>
      <div className="grid grid-cols-2 gap-8 mx-auto lg:grid-cols-4">
        {dataBook?.map((item) => (
          <BookCardV2
            item={item}
            handleTitleOnClick={() => {
              navigate(`/book-detail/${item?.bookId}`);
            }}
          />
        ))}
      </div>
    </Section>

  </>);
}

export default ContentSide;