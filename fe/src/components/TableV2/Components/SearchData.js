import React from "react";

const SearchDataTable = ({
  searchForm,
  handleSearchForm,
  searchPlaceholder,
  handleSearch,
  ...props
}) => {
  return (
    <>
      <div
        className="w-[100%] mb-[30px] p-[15px] rounded-[10px] shadow-2xl"
        style={{
          border: "1px solid #f0f0f0",
        }}
      >
        <div className="flex flex-row justify-between">
          <input
            type="text"
            className={`text-gray-900 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500  mr-[20px] w-[90%] `}
            style={{
              border: "1px solid #000",
            }}
            placeholder={searchPlaceholder}
            name="easySearch"
            value={searchForm?.esaySearch}
            onChange={handleSearchForm}
          />
          <button
            className="px-[20px] text-white rounded-[10px] font-medium bg-sky-600"
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchDataTable;