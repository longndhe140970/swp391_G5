import { Form, Input } from "antd";
import { AiOutlineMail, AiOutlineMobile, AiOutlineUser } from "react-icons/ai";
import { EMAIL_VALID, PHONE_VALID } from "../../../../utils/constants";
import { forwardRef, useImperativeHandle } from "react";

const InforForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();

  const formValues = (values) => {
    return new Promise((resolve) => {
      form.validateFields()
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          resolve(false)
        })
    })
  };

  useImperativeHandle(ref, () => ({
    formValues,
  }));

  return (<>
    <Form
      layout="vertical"
      form={form}
      name="control-hooks"
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        name="fullName"
        label="Họ và tên"
        rules={[
          {
            required: true,
            message: "Cần nhập đầy đủ thông tin!"
          },
        ]}
      >
        <Input
          size="large"
          prefix={
            <AiOutlineUser className="text-gray-300 " />
          }
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Cần nhập đầy đủ thông tin!"
          },
          {
            pattern: EMAIL_VALID,
            message: "Email không đúng định dạng"
          }
        ]}
      >
        <Input
          size="large"
          prefix={
            <AiOutlineMail className="text-gray-300 " />
          }
        />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Số điện thoại"
        rules={[
          {
            required: true,
            message: "Cần nhập đầy đủ thông tin!"
          },
          {
            pattern: PHONE_VALID,
            message: "Số điện thoại không đúng định dạng"
          }
        ]}
      >
        <Input
          size="large"
          prefix={
            <AiOutlineMobile className="text-gray-300 " />
          }
        />
      </Form.Item>
    </Form>
  </>);
});

export default InforForm;