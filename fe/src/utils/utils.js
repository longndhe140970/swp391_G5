import { isEmpty } from "lodash";
import { TOKEN_EXPIRED_TIME } from "./constants";
import moment from "moment/moment";
import { Link } from "react-router-dom";

export const b64EncodeUnicode = (str) => window.btoa(str);
export const b64DecodeUnicode = (str) => window.atob(str);

export const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, b64EncodeUnicode(value));
};

export const getLocalStrogageByKey = (key) => {
  return localStorage.getItem(key)
    ? b64DecodeUnicode(localStorage.getItem(key))
    : null;
};

export const getErrorMessage = (error) => error?.response?.data?.error;

// export const getObjectSearch = (searchParams) => {
//   if (!isEmpty(searchParams)) {
//     const strSearchParams = searchParams?.replace("?", "");
//     const listData = strSearchParams?.split("&");
//     return listData?.reduce((acc, cur) => {
//       const listAcc = cur?.split("=");
//       return { ...acc, [listAcc?.[0]]: listAcc?.[1] };
//     }, {});
//   }
// };

export const getBookId = (searchParams) => {
  if (!isEmpty(searchParams)) {
    const listData = searchParams?.split("/");
    return listData[listData.length - 1]
  }
}

export const checkExpiredTime = () => {
  const tokenExpiredTime = getLocalStrogageByKey(TOKEN_EXPIRED_TIME);
  const currentTime = new Date();
  return tokenExpiredTime && !moment(currentTime).isAfter(tokenExpiredTime);
};

export const renderHyperLink = (text, href) => {
  return (
    <Link className="text-cyan-400" to={href}>
      {text}
    </Link>
  );
};

export const renderStt = (index, currentPage = 1, itemPerPage = 10) => {
  const stt = (currentPage - 1) * itemPerPage + index + 1;
  return stt < 10 ? `0${stt}` : stt;
};

export const formatCurrency = (val) => val.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })