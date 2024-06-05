import { DatePicker, Radio } from "antd";
import ButtonCustom from "../components/Button/Button";
import InputField from "../components/Input/InputField";
import InputFieldUpload from "../components/Input/InputFieldUpload";
import MainLayout from "../layout/MainLayout";

const ProfilePage = () => {

    return (<>
        <MainLayout>
            <div className="w-full min-h-full flex justify-evenly item-center">
                <div className="max-w-[1400px] flex shadow-2xl flex-row my-[50px] w-full">
                    <div
                        className="flex flex-col px-[20px] py-[20px] w-1/4 justify-center text-center"
                        style={{
                            border: "0.5px solid #E0E0E0",
                        }}
                    >
                        <div className="flex flex-auto flex-col sm:flex-row gap-5 justify-center">
                            <div className="justify-center">
                                <img
                                    src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                                    alt="avatar"
                                    className="w-[100px] h-[100px] rounded-full mx-auto m-4"
                                />
                                <InputFieldUpload
                                    endpoint="/api/user/edit-avatar"
                                    method="PUT"
                                // setDataChange={(value) => {
                                //     setUserDetail((prev) => ({ ...prev, imageUrl: value }));
                                // }}
                                />
                            </div>
                        </div>

                        <div className="flex justify-center mb-[30px]">
                            <ButtonCustom type="submit">
                                Lưu
                            </ButtonCustom>
                        </div>
                    </div>
                    <div
                        className="flex-1 p-[40px] w-3/4"
                        style={{
                            border: "1px solid #E0E0E0",
                        }}
                    >
                        <div className="justify-evenly flex flex-col">
                            <h3 className="mb-[20px] text-lg">Thông tin cá nhân</h3>
                            <div className="py-[10px]">
                                <InputField
                                    label="Họ và tên"
                                    name="fullname"
                                // value={formik.values.firstName}
                                // onChange={formik.handleChange}
                                />
                            </div>
                            <div className="py-[10px] mb-[20px]">
                                <p className="mb-[5px]">Ngày sinh</p>
                                <DatePicker />
                                {/* <InputDatePicker
                                        value={dayjs(
                                            userDetail?.dob ?? null,
                                            DATE_FORMAT.dateFormat
                                        )}
                                        disabledDate={(current) => {
                                            return current && current > dayjs().endOf("day");
                                        }}
                                        name="dob"
                                        format={DATE_FORMAT.dateFormat}
                                        placeholder="Date of birth"
                                        onChange={(e) => {
                                            setUserDetail((prev) => ({
                                                ...prev,
                                                dob: parseDateToString(e?.$d),
                                            }));
                                        }}
                                    /> */}
                            </div>
                            <div className="py-[10px] mb-[20px]">
                                <p className="mb-[5px]">Giới tính</p>
                                <Radio.Group>
                                    <Radio value={1}>Nam</Radio>
                                    <Radio value={2}>Nữ</Radio>
                                </Radio.Group>
                                {/* <Radio.Group
                                    value={userDetail?.gender}
                                    name="gender"
                                    onChange={handleOnChange}
                                >
                                    {gender?.map?.((el) => (
                                        <Radio value={el?.value}>{el?.label}</Radio>
                                    ))}
                                </Radio.Group> */}
                            </div>
                            <div className="py-[10px]">
                                <InputField
                                    label="Email"
                                    // value={formik.values.email}
                                    name="email"
                                // onChange={formik.handleChange}
                                />
                                {/* {formik.errors.email && (
                                <ErrorMessage>{formik.errors.email}</ErrorMessage>
                                )} */}
                                {/* <ChangePassword /> */}
                                {/* <InputField
                                        label="Tên"
                                        name="lastName"
                                    // value={formik.values.lastName}
                                    // onChange={formik.handleChange}
                                    /> */}
                                {/* {formik.errors.lastName && (
                                    <ErrorMessage>{formik.errors.lastName}</ErrorMessage>
                                )} */}
                            </div>
                            <div className="flex flex-row justify-between items-center py-[10px]">
                                <InputField
                                    label="Mật khẩu"
                                    name="password"
                                    disabled
                                    value="**************"
                                // value={formik.values.firstName}
                                // onChange={formik.handleChange}
                                />
                                <ButtonCustom type="submit" className="h-[40px] translate-y-[10%] ml-2 min-w-32">
                                    Doi mat khau
                                </ButtonCustom>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    </>);
}

export default ProfilePage;