import React from "react";

const InputField = ({
  label,
  disabled,
  type,
  options,
  name,
  placehoder,
  ...props
}) => {
  return (
    <>
      <div className="w-[100%]">
        <p className="w-[100%] mb-[5px]">{label}</p>
        {type === "select" ? (
          <select
            name={name}
            className={`text-gray-900 rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 mr-[20px] w-[100%] ${
              disabled && "bg-gray-300 cursor-no-drop"
            } ${props?.className}`}
            style={{
              border: "1px #d9d9d9 solid",
            }}
            disabled={disabled}
            {...props}
          >
            {placehoder && (
              <option value={""} selected disabled>
                {placehoder}
              </option>
            )}
            {(props?.placehoder
              ? [
                  options ?? [],
                  { label: props?.placehoder, value: props?.placehoder },
                ]
              : options
            )?.map?.((option) => (
              <>
                <option value={option?.label}>{option?.label}</option>
              </>
            ))}
          </select>
        ) : (
          <input
            className={`text-gray-900 rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 mr-[20px] w-[100%] ${
              disabled && "bg-gray-300 cursor-no-drop"
            }${props?.className}`}
            style={{
              border: "1px #d9d9d9 solid",
            }}
            disabled={disabled}
            name={name}
            type={type}
            placehoder={placehoder}
            {...props}
          />
        )}
      </div>
    </>
  );
};

export default InputField;