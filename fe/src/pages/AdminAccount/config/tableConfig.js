import ActionButton from "../Components/ActionButton";

export const getTableConfig = (setTriggerReload) => {
  return [
    { title: "STT", dataIndex: "stt", width: "5%" },
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      width: "20%",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "employeeName",
      width: "20%",
      render: (_, record) => <>{`${record?.fullName}`}</>,
    },
    {
      title: "Trạng thái tài khoản",
      dataIndex: "userStatus",
      width: "20%",
      render: (_, record) => (
        <>{record?.userStatus ? "Hoạt động" : "Dừng hoạt động"}</>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "copy",
      width: "10%",
      render: (_, record) => {
        return (
          <ActionButton record={record} setTriggerReload={setTriggerReload} />
        );
      },
    },
  ];
};