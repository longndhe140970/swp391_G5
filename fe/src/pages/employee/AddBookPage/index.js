
import ButtonCustom from "../../../components/Button/Button";
import InputField from "../../../components/Input/InputField";
import { useState } from "react";
import SelectInput from "../../../components/Select";
import TextEditor from "../../../components/TextArea";
import ManagerLayout from "../../../layout/ManagerLayout/ManagerLayout";
import TitlePage from "../../../components/Title";
import InputFieldUpload from "../../../components/Input/InputFieldUpload";
import { customToast } from "../../../toasts";

const EmplAddBookPage = () => {

    const [name, setName] = useState("");
    const [publisher, setPublisher] = useState("");
    const [author, setAuthor] = useState([]);
    const [language, setLanguage] = useState("");
    const [category, setCategory] = useState([]);
    const [copies, setCopies] = useState(0);
    const [pages, setPages] = useState(0);
    const [description, setDescription] = useState("");

    const publisherData = [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "C", value: "C" },
        { label: "D", value: "D" },
        { label: "E", value: "E" },
    ];

    const authorData = [];

    const languageData = [
        { label: "A" },
        { label: "B" },
        { label: "C" },
        { label: "D" },
        { label: "E" },
    ];

    const categoryData = [];

    ["A", "B", "C", "D", "E"].map((value) => {
        authorData.push({
            label: value, value: value
        })
        categoryData.push({
            label: value, value: value
        })
    });

    const handleNameChange = async (e) => {
        setName(e.target.value)
    }

    const handlePublisherChange = async (e) => {
        setPublisher(e.target.value)
    };

    const handleAuthorChange = async (value) => {
        setAuthor(value)
    };

    const handleCategoryChange = async (value) => {
        setCategory(value)
    };

    const handleLanguageChange = async (e) => {
        setLanguage(e.target.value)
    };

    const handleCopiesChange = async (e) => {
        setLanguage(e.target.value)
    };

    const handlePagesChange = async (e) => {
        setLanguage(e.target.value)
    };

    const handleDescriptionChange = async (e) => {

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

        } catch (error) {
            const errorMessage = error?.response?.data?.message;
            customToast({ type: "error", message: errorMessage ?? "Dang nhap khong thanh cong" });
        }
    }

    return (<>
        <ManagerLayout>
            <TitlePage title={"Sách"} />
            <form>
                <div className="max-w-[1400px] flex shadow-2xl flex-row my-[50px] w-full">
                    <div
                        className="flex flex-col px-[20px] py-[20px] justify-center text-center w-1/2"
                        style={{
                            border: "0.5px solid #E0E0E0",
                        }}
                    >
                        <InputFieldUpload />
                        <div className="flex flex-col gap-5 ">
                            <TextEditor />
                        </div>
                    </div>
                    <div
                        className="p-[40px] w-1/2"
                        style={{
                            border: "1px solid #E0E0E0",
                        }}
                    >
                        <div className="justify-evenly flex flex-col">
                            <div className="py-[5px]">
                                <InputField
                                    label="Tên sách"
                                    name="bookName"
                                    onChange={handleNameChange}
                                />
                            </div>
                            <div className="py-[5px]">
                                <InputField
                                    label="Nhà xuất bản"
                                    name="publisher"
                                    type={"select"}
                                    placehoder={"Chọn nhà xuất bản"}
                                    onChange={handlePublisherChange}
                                    options={publisherData}
                                />
                            </div>
                            <div className="py-[5px]">
                                <SelectInput
                                    label="Tác giả"
                                    placeholder={"Chọn tác giả"}
                                    defaultValue={author}
                                    options={authorData}
                                    onChange={handleAuthorChange}
                                />
                            </div>
                            <div className="py-[5px]">
                                <InputField
                                    label="Ngôn ngữ"
                                    name="language"
                                    type={"select"}
                                    placehoder={"Chọn ngôn ngữ"}
                                    onChange={handleLanguageChange}
                                    options={languageData}
                                />
                            </div>
                            <div className="py-[5px]">
                                <SelectInput
                                    label="Danh mục"
                                    placeholder={"Chọn danh mục"}
                                    defaultValue={category}
                                    options={categoryData}
                                    onChange={handleCategoryChange}
                                />
                            </div>
                            <div className="py-[5px]">
                                <InputField
                                    label="Bản sao"
                                    name="copies"
                                    onChange={handleCopiesChange}
                                />
                            </div>
                            <div className="py-[5px]">
                                <InputField
                                    label="Số trang"
                                    name="pages"
                                    onChange={handlePagesChange}
                                />
                            </div>
                            <div className="flex justify-center py-[5px]">
                                <ButtonCustom type="submit" onSubmit={handleSubmit}>
                                    Lưu
                                </ButtonCustom>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </ManagerLayout>
    </>);
}

export default EmplAddBookPage;