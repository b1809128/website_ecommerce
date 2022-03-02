import React from "react";
import axios from "axios";
import Paganition from "../../components/bar/pagination/Pagination";
export default function Test() {
  const checkAPI = async () => {
    try {
      const response = await axios.get("http://localhost:5000/manage/api");
      // console.log(response.data)
      const test = response.data.filter((data, index) => {
        return index < 4;
      });
      console.log(test);
    } catch (error) {
      console.error(error);
    }
  };
  checkAPI();
  return (
    <>
      <Paganition />
    </>
  );
}
