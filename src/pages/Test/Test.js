import React, { useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/bar/pagination/Pagination";
export default function Test() {
  // const [number, setNumber] = useState();
  useEffect(() => {
    const checkAPI = async () => {
      try {
      } catch (error) {
        console.log(error);
      }
    };
    checkAPI();
  });
  // console.log(number);
  const addCart = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/product/cart/as_001"
      );
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkOut = async () => {
    try {
      const result = await axios.get("http://localhost:5000/product/checkout");
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={addCart}>Add Cart</button>
      <button onClick={checkOut}>Check Out</button>

      <Pagination />
    </>
  );
}
