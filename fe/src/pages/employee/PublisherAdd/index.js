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
import { handleSubmitPub } from "./api";
import { PUBLISHER_API } from "../../../services/constant";
import ButtonCustom from "../../../components/Button/Button";

const EmplPublisherAdd = () => {

  const validationSchema = yup.object({
    name: yup
      .string("Hãy nhập tên nhà xuất bản")
      .required("Tên nhà xuất bản không được để trống")
      .trim("Tên nhà xuất bản không được có khoảng trống"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmitPub({
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
    const idPub = getBookId(location?.pathname);
    const fetchData = async () => {

      handleOpenLoading();
      try {
        const dataResponse = await sendRequest({
          method: "GET",
          endpoint: `${PUBLISHER_API.LIST}/${idPub}`,
        });
        formik.setValues({
          name: dataResponse?.data?.data?.authorDetail?.name || "",
          id: idPub
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
          title={isDetail ? "Chỉnh sửa nhà xuất bản" : "Thêm nhà xuất bản"}
        />
        <div
          className="w-[500px] mx-auto rounded-[10px] shadow-2xl min-h-[80vh] p-[20px]"
          style={{
            border: "1px solid #f0f0f0",
          }}
        >
          <InputField
            label="Tên nhà xuất bản"
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
export default EmplPublisherAdd;