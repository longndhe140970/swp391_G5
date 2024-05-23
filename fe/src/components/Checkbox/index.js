const CheckBox = ({ id, value, label, className, name, ...props }) => {
  return (
    <>
      <div
        className={`flex items-center justify-between flex-wrap ${className}`}
      >
        <label className="text-sm text-gray-500 cursor-pointer">
          <input
            type="checkbox"
            id={id}
            className="mr-2"
            name={name}
            {...props}
          />
          {label}
        </label>
      </div>
    </>
  );
};

export default CheckBox;