const { Table } = require("antd");
const { default: CustomPagination } = require("../Pagination");
const { default: SearchDataTable } = require("./Components/SearchData");

const TableV2 = ({
  searchPlaceholder,
  searchForm,
  handleSearchForm,
  handleSearch,
  current,
  handlePageChange,
  total,
  noPagination = false,
  noSearchDataTable = false,
  scrollY = 500,
  pageSize = 10,
  ...props
}) => {
  return (
    <>
      <div>
        {!noSearchDataTable && (
          <SearchDataTable
            searchPlaceholder={searchPlaceholder}
            searchForm={searchForm}
            handleSearchForm={handleSearchForm}
            handleSearch={handleSearch}
          />
        )}
        <div
          style={{
            border: "1px solid #f0f0f0",
          }}
        >
          <Table
            {...props}
            pagination={false}
            scroll={{ y: scrollY }}
          />
        </div>
        {!noPagination && (
          <div className="flex justify-between items-center mt-[30px]">
            <p>
              Hiện {props?.dataSource?.length || 0} trong tổng số {total}
            </p>
            <div>
              <CustomPagination
                pageSize={pageSize}
                current={current}
                total={total}
                onChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TableV2;