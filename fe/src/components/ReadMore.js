import { useState } from "react";

const ReadMore = ({ data, maxLength = 200, ...props }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (<>
    {data?.length > maxLength ? (
      <>
        <div>
          {data?.slice(0, maxLength)}
          {collapsed ? <></> : "..."}
          {collapsed ? (
            <span>{data?.slice(maxLength, data?.length)}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="flex justify-center mt-[50px]">
          <button
            className="text-center px-[20px] py-[10px] uppercase text-cyan-400"
            style={{
              border: "1px solid",
            }}
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? "Thu gọn" : "Xem thêm"}
          </button>
        </div>
      </>
    ) : (
      <>
        <div>{data}</div>
      </>
    )}
  </>);
}

export default ReadMore
