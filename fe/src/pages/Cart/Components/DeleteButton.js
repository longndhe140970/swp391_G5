import useOrderHooks from "../hooks/useOrderHooks";

const DeleteButton = ({ record, setReloadData }) => {
  const { handleDeleteCart } = useOrderHooks({ record, setReloadData });
  return (<>
    <div className="flex flex-col gap-10 lg:flex-row">
      <img
        src={record?.imageUrl}
        alt={record?.title}
        className="w-[80px] object-cover shadow-2xl"
      />
      <div>
        <span>{record?.title}</span>
        <div
          className="cursor-pointer text-red-600 text-left mt-[10px]"
          onClick={handleDeleteCart}
        >
          Xóa
        </div>
      </div>
    </div>
  </>);
}

export default DeleteButton;