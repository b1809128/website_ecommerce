import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/bar/pagination/Pagination";
export default function Test() {
  // const [number, setNumber] = useState();
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cart));
  });
  // console.log(number);
  const [cart, setCart] = useState([]);
  /**
   * array -> luu array state
   * cap nhat array -> array = prevArray.push(elements)
   * log->array
   */
  const [id, setId] = useState("");
  const addCart = () => {
    if (cart.length === 0) {
      var array = [];
      array.push({
        MSHH: id,
        SoLuongHang: 1,
      });
      setCart(array);
    } else {
      var newItem = true;
      var cartArray = cart;
      for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i].MSHH === id) {
          cartArray[i].SoLuongHang++;
          newItem = false;
          break;
        }
      }
      if (newItem) {
        cartArray.push({
          MSHH: id,
          SoLuongHang: 1,
        });
      }
      var newArray = [...cartArray];
      setCart(newArray);
    }
    // console.log(cart);
  };

  const checkOut = async () => {
    try {
      // console.log(cart);
      await axios.post("http://localhost:5000/product/test", {
        number: cart.length,
      });
    } catch (error) {}
  };
  return (
    <>
      <input type="text" onChange={(e) => setId(e.target.value)} />
      <button onClick={addCart}>Add Cart</button>
      <button onClick={checkOut}>Check Out</button>

      <Pagination />
    </>
  );
}
