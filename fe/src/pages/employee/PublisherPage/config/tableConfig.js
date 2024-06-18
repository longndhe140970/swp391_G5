import { DEFINE_ROUTES_EMPL } from "../../../../routes/MenuEmpl";
import { renderHyperLink } from "../../../../utils/utils";

export const getTableConfig = () => {
  return [
    { title: "STT", dataIndex: "stt", width: "5%" },
    {
      title: "Tên nhà xuất bản",
      dataIndex: "name",
      width: "20%",
      render: (text, record) =>
        renderHyperLink(
          text,
          `${DEFINE_ROUTES_EMPL.EMPL_PUBLISHER_DETAIL}?id=${record.publisherId}`
        ),
    }
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