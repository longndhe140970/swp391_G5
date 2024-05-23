import { useEffect, useState } from "react";
import useSearchStore from "../../../stores/useSearchStore";
import MenuSection from "./MenuSection";
import { FaSearch } from "react-icons/fa";
import CheckBox from "../../../components/Checkbox";

const Menuside = ({ listPublisher, listCategory, listLanguage, listAuthor }) => {
  const { searchData, setSearchData } = useSearchStore();
  const [titleSearch, setTitle] = useState("");

  const handleSearch = () => {
    setSearchData({ title: titleSearch });
  };

  useEffect(() => {
    // console.log('searchData :>> ', searchData);
  }, [searchData]);

  return (<>
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
    <MenuSection title={"Nha xuat ban"}>
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
    <MenuSection title={"Gia"}>

    </MenuSection>
  </>);
}

export default Menuside;