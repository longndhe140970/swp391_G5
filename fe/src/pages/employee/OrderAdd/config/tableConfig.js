import { InputNumber, Popconfirm } from "antd";
import { formatCurrency } from "../../../../utils/utils";
import { AiOutlineDelete } from "react-icons/ai";

export const TableInvoiceAddConfig = (onRemove, updateQuantity) => {
  return [
    {
      dataIndex: "title",
      title: "Tên sách",
      width: "25%",
      render: (_, item) => (
        <div className="flex items-center w-full">
          <img src={item.imageUrl} className="object-cover h-10 mr-2 w-7" alt="img" />
          <div className="h-full">
            <div className="line-clamp-2" title={item.title}>
              {item.title}
            </div>
            <div className="mb-1 text-xs text-gray-400">
              {item.authors?.map((el) => el?.name)?.join(", ")}
            </div>
          </div>
        </div>
      ),
    },
    {
      dataIndex: "quantity",
      title: "Số lượng",
      width: "12%",
      render: (text, record, index) => (
        <InputNumber
          defaultValue={text}
          min={1}
          max={record.copies_available}
          onChange={(value) => {
            updateQuantity(index, value);
          }}
        />
      ),
    },
    {
      dataIndex: "price",
      title: "Đơn giá",
      width: "12%",
      render: (_, record) => <span>{formatCurrency(record?.price)}</span>,
    },
    {
      dataIndex: "price",
      title: "Tổng tiền",
      width: "13%",
      render: (text, record) => <span>{formatCurrency(text * record.quantity * record.dateBetween)}</span>
    },
    {
      dataIndex: "bookId",
      title: "",
      width: "5%",
      render: (text) => (
        <>
          <Popconfirm
            placement="topLeft"
            title="Xác nhận"
            description="Xác nhận xoá cuốn sách ra khỏi đơn?"
            okText="Xác nhận"
            cancelText="Huỷ"
            onConfirm={() => {
              onRemove(text);
            }}
          >
            <AiOutlineDelete className="text-gray-400 hover:text-red-500" />
          </Popconfirm>
        </>
      ),
    },
  ];
};