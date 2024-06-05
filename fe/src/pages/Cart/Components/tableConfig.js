import DeleteButton from "./DeleteButton";
import QuantityButton from "./QuantityButton";

export const tableCartConfig = (setReloadData) => {
  return [
    {
      dataIndex: "title",
      title: "Tên sách",
      render: (_, record) => (
        <DeleteButton record={record} setReloadData={setReloadData} />
      ),
    },
    {
      dataIndex: "quantity",
      title: "Số lượng",
      render: (_, record) => (
        <QuantityButton record={record} setReloadData={setReloadData} />
      ),
    },
    {
      dataIndex: "price",
      title: "Tổng tiền",
    },
  ];
};