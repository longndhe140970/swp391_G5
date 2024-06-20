import { useState } from "react";

const ReadMore = ({ data, maxLength = 200, ...props }) => {
  const [collapsed, setCollapsed] = useState(false);

  const parseDescription = (description) => {
    // Regex to match image URLs
    const urlRegex = /(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))/g;
    const parts = description.split(urlRegex);
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return <img src={part} alt="img" style={{ maxWidth: "100%", margin: "10px 0" }} />;
      }
      return part;
    });
  };

  return (<>
    {data?.length > maxLength ? (
      <>
        <div>
          {data?.slice(0, maxLength)}
          {collapsed ? <></> : "..."}
          {collapsed ? (
            <span>{parseDescription(data?.slice(maxLength, data?.length))} </span>
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
        <div>{parseDescription(data)}</div>
      </>
    )}
  </>);
}

export default ReadMore
