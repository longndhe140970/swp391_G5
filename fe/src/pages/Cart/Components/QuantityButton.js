import useOrderHooks from "../hooks/useOrderHooks";

const QuantityButton = ({ record, setReloadData }) => {
  const { handleMinus, handlePlus } = useOrderHooks({ record, setReloadData });

  return (
    <>
      <div className="flex">
        <button className="w-5 text-center border" onClick={handleMinus}>
          -
        </button>
        <div className="text-center border w-7">{record?.quantity}</div>
        <button className="w-5 text-center border" onClick={handlePlus}>
          +
        </button>
      </div>
    </>
  );
};

export default QuantityButton;