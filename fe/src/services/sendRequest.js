import axios from "axios";
import { API_URL } from "./constant";

// export const sendRequest = async ({ method, endpoint, data, ...remains }) => {
//   return axios.create({
//     method: method?.toLowerCase(),
//     url: `${API_URL}${endpoint}`,
//     data,
//     ...remains,
//   });
// };

export const sendRequest = async ({ method, endpoint, data }) => {
  try {
    const response = await axios({
      method: method?.toLowerCase(),
      url: `${API_URL}${endpoint}`,
      data,
    });
    return response;
  } catch (error) {
    throw error;
  }
};