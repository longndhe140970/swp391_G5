import { DEFINE_ROUTES_EMPL } from "../../../../routes/MenuEmpl";
import { renderHyperLink } from "../../../../utils/utils";

export const getTableConfig = () => {
  return [
    { title: "STT", dataIndex: "stt", width: "5%" },
    {
      title: "Tên sách",
      dataIndex: "title",
      width: "20%",
      render: (text, record) =>
        renderHyperLink(
          text,
          `${DEFINE_ROUTES_EMPL.EMPL_BOOK_DETAIL}?id=${record.bookId}`
        ),
    },
    {
      title: "Tác giả",
      dataIndex: "authors",
      width: "15%",
      render: (_, record) => (
        <span>{record?.authors?.map((el) => (el))?.join(", ")}</span>
      ),
    },
    {
      title: "Ngôn ngữ",
      dataIndex: "language",
      width: "10%",
    },
    {
      title: "Giá",
      dataIndex: "price",
      width: "10%",
    },
    {
      title: "Số lượng",
      dataIndex: "copies_available",
      width: "10%",
    },
    // {
    //   title: "Thao tác",
    //   dataIndex: "copy",
    //   width: "10%",
    //   render: (_, record) => {
    //     return <ActionButtons record={record} />;
    //   },
    // },
  ];
}