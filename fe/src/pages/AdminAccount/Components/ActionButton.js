import ButtonCustom from "../../../components/Button/Button";

const ActionButton = ({ record, setTriggerReload }) => {

  const handleChangeStatus = () => {

  }

  return (<>
    <div className="flex items-center justify-center gap-8">
      {record?.userStatus ? (
        <ButtonCustom type="danger" onClick={handleChangeStatus}>
          Tắt
        </ButtonCustom>
      ) : (
        <ButtonCustom type="success" onClick={handleChangeStatus}>
          Bật
        </ButtonCustom>
      )}
    </div>
  </>);
}

export default ActionButton;