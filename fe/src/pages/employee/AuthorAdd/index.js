import { useEffect, useMemo, useState } from "react";
import InputField from "../../../components/Input/InputField";
import TitlePage from "../../../components/Title";
import { getBookId, getErrorMessage } from "../../../utils/utils";
import { useLocation } from "react-router-dom";
import usePopupStore from "../../../stores/usePopupStore";
import { sendRequest } from "../../../services/sendRequest";
import { customToast } from "../../../toasts";
import ManagerLayout from "../../../layout/ManagerLayout/ManagerLayout";
import { useFormik } from "formik";
import * as yup from "yup";
import { handleSubmitAuthor } from "./api";
import { AUTHOR_API } from "../../../services/constant";
import ButtonCustom from "../../../components/Button/Button";

const EmplAuthorAdd = () => {

  const validationSchema = yup.object({
    name: yup
      .string("Hãy nhập tên tác giả")
      .required("Tên tác giả không được để trống")
      .trim("Tên tác giả không được có khoảng trống"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmitAuthor({
        formData: values,
        isDetail,
        handleCloseLoading,
        handleOpenLoading,
        setTriggerReload,
      });
    },
  });
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const location = useLocation();
  const isDetail = useMemo(() => {
    return location?.pathname?.includes("detail");
  }, [location?.pathname]);
  const [triggerReload, setTriggerReload] = useState(false);


  useEffect(() => {
    const idAuthor = getBookId(location?.pathname);
    const fetchData = async () => {

      handleOpenLoading();
      try {
        const dataResponse = await sendRequest({
          method: "GET",
          endpoint: `${AUTHOR_API.LIST}/${idAuthor}`,
        });
        formik.setValues({
          name: dataResponse?.data?.data?.authorDetail?.name || "",
          id: idAuthor
        });
      } catch (error) {
        customToast({
          type: "error",
          message: getErrorMessage(error),
        });
      } finally {
        handleCloseLoading();
      }

    };
    fetchData();
  }, [getBookId(location?.pathname), triggerReload]);

  return (
    <>
      <ManagerLayout>
        <TitlePage
          title={isDetail ? "Chỉnh sửa tác giả" : "Thêm tác giả"}
        />
        <div
          className="w-[500px] mx-auto rounded-[10px] shadow-2xl min-h-[80vh] p-[20px]"
          style={{
            border: "1px solid #f0f0f0",
          }}
        >
          <InputField
            label="Tên tác giả"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {/* {formik.errors.name && (
            <ErrorMessage> {formik.errors.name}</ErrorMessage>
          )} */}
          {formik.errors.name && formik.touched.name ? (
            <div className="text-red-500">{formik.errors.name}</div>
          ) : null}
          <div className="w-[100%] flex justify-center gap-5 mt-10">
            {isDetail ? (
              <>
                <ButtonCustom onClick={formik.handleSubmit} type="submit">
                  Lưu
                </ButtonCustom>
              </>
            ) : (
              <ButtonCustom onClick={formik.handleSubmit} type="submit">
                Thêm
              </ButtonCustom>
            )}
          </div>
        </div>
      </ManagerLayout>
    </>
  );
}
export default EmplAuthorAdd;