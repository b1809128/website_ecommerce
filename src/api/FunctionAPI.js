import axios from "axios";

export const fetchAPI = async () => {
  const api =  await axios.get(`https://localhost:5000/manage/api`);
  return api.data
};
