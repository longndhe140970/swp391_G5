import { AutoComplete, Input, Table } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { formatCurrency } from "../../../../utils/utils";
import { sendRequest } from "../../../../services/sendRequest";
import { BOOK_API } from "../../../../services/constant";
import { customToast } from "../../../../toasts";
import { TableInvoiceAddConfig } from "../config/tableConfig";

const InforBook = forwardRef((props, ref) => {
  const [keyword, setKeyword] = useState("");
  const [options, setOptions] = useState([]);
  const [bookSelected, setBookSelected] = useState({ data: [] });
  const [total, setTotal] = useState(0)

  useImperativeHandle(ref, () => ({
    getOrderData: () => buildOderData(),
  }));

  useEffect(() => {
    handleSearch("").then();
    return () => { };
  }, []);

  useEffect(() => {
    if (!bookSelected.data.length) return setTotal(0)

    const _total = bookSelected.data.reduce((acc, item) => {
      const itemTotal = item.price * item.quantity * item.dateBetween;
      return acc + itemTotal;
    }, 0)

    setTotal(_total)
  }, [bookSelected]);

  const handleSearch = async (value) => {
    setKeyword(value);

    let result = [];
    try {
      const res = await sendRequest({
        method: "POST",
        endpoint: BOOK_API.FILL_SEARCH,
        data: {
          searchText: value,
        },
      });
      result = res?.data?.data?.listBook ?? [];
    } catch (e) {
      console.log("e ", e);
    } finally {
    }

    const _options = [];

    result.forEach((item) => {
      _options.push({
        value: item.bookId,
        data: item,
        label: (
          <div className="flex items-center w-full">
            <img src={item.imageUrl} className="object-cover w-8 h-12 mr-2" alt="img" />
            <div className="flex-1 h-full">
              <div className="max-w-lg mb-1 leading-none truncate">
                {item.title}
              </div>
              <div className="mb-1 text-xs text-gray-400">
                {item.authors?.map((el) => el?.name)?.join(", ")}
              </div>
            </div>
            <div className="ml-auto">{item.copies_available}</div>
          </div>
        ),
      });
    });

    setOptions(_options);
  }

  const onSelect = (value) => {
    const hasSelect = bookSelected.data.some((item) => item.bookId === value);

    if (hasSelect) {
      customToast({
        type: "warning",
        message: "Cuốn sách đã được chọn trước đó",
      });
      return;
    }

    const itemSelect = options.find((item) => item.value === value).data;
    itemSelect.quantity = 1;

    setBookSelected({ data: [...bookSelected.data, ...[itemSelect]] });
  };

  const onRemove = (id) => {
    const _bookSelected = bookSelected.data.filter((item) => item.bookId !== id)
    setBookSelected({ data: _bookSelected });
  };

  const updateQuantity = (index, value) => {
    bookSelected.data[index].quantity = value;
    setBookSelected({ data: bookSelected.data });
  };

  const buildOderData = () => {
    return bookSelected.data.map((item) => ({
      cartItemId: 0, // TODO
      bookId: item.bookId,
      quantity: item.quantity,
    }));
  };

  return (<>
    <div className="mb-2">Tìm kiếm theo tên sách</div>
    <AutoComplete
      value={keyword}
      popupMatchSelectWidth={650}
      style={{ width: 650 }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
      className="mb-6"
    >
      <Input size="large" placeholder="Nhập để tìm kiếm" />
    </AutoComplete>

    <Table
      rowKey="bookId"
      dataSource={bookSelected.data}
      columns={TableInvoiceAddConfig(
        onRemove,
        updateQuantity
      )}
      pagination={false}
      scroll={{ y: 400 }}
    />
    <div className="flex w-full px-4 mt-4 mb-2 text-lg">
      <div>Tổng tiền</div>
      <div className="w-40 ml-auto">
        {formatCurrency(total)}
      </div>
    </div>
  </>);
});

export default InforBook;