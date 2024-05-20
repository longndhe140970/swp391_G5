import axios from "axios";
import { API_URL } from "./constant";

export const sendRequest = async ({ method, endpoint, data, ...remains }) => {
  return await axios.create({
    method: method?.toLowerCase(),
    url: `${API_URL}${endpoint}`,
    data,
    ...remains,
  });
};