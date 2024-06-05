import axios from "axios";
import { checkExpiredTime, getLocalStrogageByKey } from "../utils/utils";
import { TOKEN_STORAGE } from "../utils/constants";

const customAxios = axios.create();

customAxios.interceptors.request.use((req) => {
  const accessToken = getLocalStrogageByKey(TOKEN_STORAGE);
  if (accessToken && checkExpiredTime()) {
    req.headers.Authorization = `Bearer ` + accessToken;
    return req;
  }
  return req;
});

customAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {

    return Promise.reject(err);
  }
);

export default customAxios;