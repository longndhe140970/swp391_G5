import { Table } from "antd";

const TableCustom = ({
  noPagination = false,
  scrollY = 500,
  pageSize = 10,
  ...props
}) => {
  return (<>
    <div style={{
      border: "1px solid #f0f0f0",
    }}>
      <Table {...props}
        pagination={false}
        scroll={{ y: scrollY }} />
    </div>
  </>);
}

export default TableCustom;