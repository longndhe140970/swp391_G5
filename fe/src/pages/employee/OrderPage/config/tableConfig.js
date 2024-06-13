import { DEFINE_ROUTES_EMPL } from "../../../../routes/MenuEmpl";
import { renderHyperLink } from "../../../../utils/utils";

export const getTableConfig = () => {
  return [
    { title: "STT", dataIndex: "stt", width: "5%" },
    {
      title: "ma don",
      dataIndex: "codeOrder",
      width: "20%",
      render: (text, record) =>
        renderHyperLink(
          text,
          `${DEFINE_ROUTES_EMPL.EMPL_ORDER_DETAIL}?id=${record.orderId}`
        ),
    },
    {
      title: "Thoi gian",
      dataIndex: "createAt",
      width: "15%",
    },
    {
      title: "Giá",
      dataIndex: "totalPrice",
      width: "10%",
    },
    {
      title: "Số lượng",
      dataIndex: "totalQuantity",
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