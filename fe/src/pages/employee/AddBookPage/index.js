
import ButtonCustom from "../../../components/Button/Button";
import InputField from "../../../components/Input/InputField";
import { useEffect, useMemo, useState } from "react";
import SelectInput from "../../../components/Select";
import TextEditor from "../../../components/TextArea";
import ManagerLayout from "../../../layout/ManagerLayout/ManagerLayout";
import TitlePage from "../../../components/Title";
import InputFieldUpload from "../../../components/Input/InputFieldUpload";
import { customToast } from "../../../toasts";
import { PUBLISHER_API } from "../../../services/constant";
import * as yup from "yup";
import { useFormik } from "formik";
import { handleSubmitBook } from "./api";
import usePopupStore from "../../../stores/usePopupStore";
import { useLocation } from "react-router-dom";

const EmplAddBookPage = () => {

    const [name, setName] = useState("");
    const [publisher, setPublisher] = useState("");
    const [author, setAuthor] = useState([]);
    const [language, setLanguage] = useState("");
    const [category, setCategory] = useState([]);
    const [copies, setCopies] = useState(0);
    const [page, setpage] = useState(0);
    const [description, setDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const { handleOpenLoading, handleCloseLoading } = usePopupStore();

    const location = useLocation()

    const isDetail = useMemo(() => {
        return location?.pathname?.includes("detail");
      }, [location?.pathname]);
      const [triggerReload, setTriggerReload] = useState(false);


    const validationSchema = yup.object({
        imageUrl: yup
            .string("Hãy nhập hình ảnh")
            .required("Hình ảnh không được để trống")
            .trim(),
        title: yup.string("Hãy nhập tiêu đề sách")
            .required("Tiêu đề sách không được để trống")
            .trim("Tiêu đề sách không được có khoảng trống"),
        description: yup.string("Hãy nhập mô tả sách")
            .required("Mô tả sách không được để trống"),
        copies_available: yup.number("Hãy nhập số lượng").required("Hãy nhập số lượng").positive("Hãy nhập số lượng > 0").integer(),
        page: yup.number("Hãy nhập số trang sách").required("Hãy nhập số trang sách").positive("Hãy nhập số trang sách > 0").integer(),
        category: yup.array().min(1, "Hãy chọn danh mục").required("Hãy chọn danh mục"),
        publisher: yup.string("Hãy nhập nhà xuất bản")
            .required("Nhà xuất bản không được để trống")
            .trim(""),
        author: yup.array().min(1, "Hãy chọn tác giả").required("Hãy chọn tác giả"),
        language: yup.string("Hãy chọn ngôn ngữ")
            .required("Ngôn ngữ không được để trống")
            .trim(""),
    });
    const formik = useFormik({
        initialValues: {
            imageUrl: "",
            title: "",
            description: "",
            copies_available: 0,
            page: 0,
            category: [],
            publisher: "",
            author: [],
            language: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmitBook({
                formData: values,
                isDetail,
                handleCloseLoading,
                handleOpenLoading,
                setTriggerReload,
            });
        },
    });

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

    const handlepageChange = async (e) => {
        setLanguage(e.target.value)
    };

    const handleDescriptionChange = async (e) => {

    }

    // const getDataPublisher = async () => {

    //     handleOpenLoading();
    //     try {
    //       const dataResponse = await sendRequest({
    //         method: "GET",
    //         endpoint: `${PUBLISHER_API.LIST}`,
    //       });
    //       formik.setValues({
    //         name: dataResponse?.data?.data?.categoryDetail?.name || "",
    //         id: idCategory
    //       });
    //     } catch (error) {
    //       customToast({
    //         type: "error",
    //         message: getErrorMessage(error),
    //       });
    //     } finally {
    //       handleCloseLoading();
    //     }

    //   };

    useEffect(() => {

    })

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

        } catch (error) {
            const errorMessage = error?.response?.data?.message;
            customToast({ type: "error", message: errorMessage ?? "Lỗi" });
        }
    }

    return (<>
        <ManagerLayout>
            <TitlePage title={"Tạo sách"} />
            <form>
                <div className=" flex shadow-2xl flex-row w-full">
                    <img src={imgUrl}></img>
                    <div
                        className="flex flex-col px-[20px] py-[20px] justify-center text-center w-1/2"
                        style={{
                            border: "0.5px solid #E0E0E0",
                        }}
                    >
                        <InputFieldUpload
                            name="imageUrl"
                            setDataChange={setImgUrl}
                            value={formik.values.imageUrl}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.imageUrl && formik.touched.name ? (
                            <div className="text-red-500">{formik.errors.name}</div>
                        ) : null}
                        <div className="flex flex-col gap-5 ">
                            <TextEditor
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.description && formik.touched.name ? (
                                <div className="text-red-500">{formik.errors.name}</div>
                            ) : null}
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
                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.title && formik.touched.name ? (
                                    <div className="text-red-500">{formik.errors.name}</div>
                                ) : null}
                            </div>
                            <div className="py-[5px]">
                                <InputField
                                    label="Nhà xuất bản"
                                    name="publisher"
                                    type={"select"}
                                    placehoder={"Chọn nhà xuất bản"}
                                    value={formik.values.publisher}
                                    onChange={formik.handleChange}
                                    options={publisherData}
                                />
                                {formik.errors.publisher && formik.touched.name ? (
                                    <div className="text-red-500">{formik.errors.name}</div>
                                ) : null}
                            </div>
                            <div className="py-[5px]">
                                <SelectInput
                                    label="Tác giả"
                                    name="author"
                                    placeholder={"Chọn tác giả"}
                                    defaultValue={author}
                                    options={authorData}
                                    value={formik.values.author}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.author && formik.touched.name ? (
                                    <div className="text-red-500">{formik.errors.name}</div>
                                ) : null}
                            </div>
                            <div className="py-[5px]">
                                <InputField
                                    label="Ngôn ngữ"
                                    name="language"
                                    type={"select"}
                                    placehoder={"Chọn ngôn ngữ"}
                                    value={formik.values.language}
                                    onChange={formik.handleChange}
                                    options={languageData}
                                />
                                {formik.errors.language && formik.touched.name ? (
                                    <div className="text-red-500">{formik.errors.name}</div>
                                ) : null}
                            </div>
                            <div className="py-[5px]">
                                <SelectInput
                                    label="Danh mục"
                                    placeholder={"Chọn danh mục"}
                                    name="category"
                                    defaultValue={category}
                                    options={categoryData}
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.category && formik.touched.name ? (
                                    <div className="text-red-500">{formik.errors.name}</div>
                                ) : null}
                            </div>
                            <div className="py-[5px]">
                                <InputField
                                    label="Bản sao"
                                    name="copies_available"
                                    value={formik.values.copies_available}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.copies_available && formik.touched.name ? (
                                    <div className="text-red-500">{formik.errors.name}</div>
                                ) : null}
                            </div>
                            <div className="py-[5px]">
                                <InputField
                                    label="Số trang"
                                    name="page"
                                    value={formik.values.page}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.page && formik.touched.name ? (
                                    <div className="text-red-500">{formik.errors.name}</div>
                                ) : null}
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