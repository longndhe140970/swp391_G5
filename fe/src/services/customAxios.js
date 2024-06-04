import axios from "axios";

const customAxios = axios.create();

customAxios.interceptors.request.use((req) => {
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