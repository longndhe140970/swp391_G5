import { API_URL } from "./constant";
import customAxios from "./customAxios";

export const sendRequest = async ({ method, endpoint, data, ...remains }) => {
  return await customAxios({
    method: method?.toLowerCase(),
    url: `${API_URL}${endpoint}`,
    data,
    ...remains,
  });
};

// export const sendRequest = async ({ method, endpoint, data, ...remains }) => {
//   // try {
//   return customAxios.create({
//     method: method?.toLowerCase(),
//     url: `${API_URL}${endpoint}`,
//     data,
//     remains,
//   });
//   // } catch (error) {
//   //   throw error;
//   // }
// };