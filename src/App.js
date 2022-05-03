import "./App.css";
import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AllProducts from "./pages/AllProducts/AllProducts";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ScrollTop from "./components/scrolltop/ScrollTop";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ProductDetailsAPI from "./pages/ProductDetails/ProductDetailsAPI";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut";
import { productsData } from "./data";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";
import Search from "./pages/Search/Search";
import { AuthContext } from "./context/AuthContext";
import AdminOrderDetails from "./pages/OrderDetails/AdminOrderDetails";
import CustomerOrderDetails from "./pages/OrderDetails/CustomerOrderDetails";
import Test from "./pages/Test/Test";
import Swal from "sweetalert2";
import Posts from "./pages/Posts/Posts";
import Introduce from "./pages/Introduce/Introduce";
import Contact from "./pages/Contact/Contact";
function App() {
  const { user } = useContext(AuthContext);

  //TODO: Auto update LocalStorage function
  const getData = () => {
    const local = localStorage.getItem("cartItems");
    if (local) {
      return JSON.parse(local);
    } else {
      return [];
    }
  };
  const [cartItems, setCartItems] = useState(getData());

  //TODO: Add to cart
  const addCart = (MSHH) => {
    var exist = getData().find((x) => x.MSHH === MSHH);
    if (exist) {
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          getData().map((x) =>
            x.MSHH === MSHH ? { ...exist, SoLuong: exist.SoLuong + 1 } : x
          )
        )
      );
    } else {
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...getData(), { MSHH, SoLuong: 1 }])
      );
    }
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Đã thêm vào giỏ hàng",
      showConfirmButton: false,
      timer: 1500,
    });
    setCartItems(getData());
  };

  const addCartByQuantity = (MSHH, quantity) => {
    var exist = getData().find((x) => x.MSHH === MSHH);
    if (exist) {
      if (quantity) {
        localStorage.setItem(
          "cartItems",
          JSON.stringify(
            getData().map((x) =>
              x.MSHH === MSHH
                ? { ...exist, SoLuong: exist.SoLuong + quantity }
                : x
            )
          )
        );
      } else {
        localStorage.setItem(
          "cartItems",
          JSON.stringify(
            getData().map((x) =>
              x.MSHH === MSHH ? { ...exist, SoLuong: exist.SoLuong + 1 } : x
            )
          )
        );
      }
    } else {
      if (quantity) {
        localStorage.setItem(
          "cartItems",
          JSON.stringify([...getData(), { MSHH, SoLuong: quantity }])
        );
      } else {
        localStorage.setItem(
          "cartItems",
          JSON.stringify([...getData(), { MSHH, SoLuong: 1 }])
        );
      }
    }
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Đã thêm vào giỏ hàng",
      showConfirmButton: false,
      timer: 1500,
    });
    setCartItems(getData());
  };

  const addCheckOutByQuantity = (MSHH, quantity) => {
    var exist = getData().find((x) => x.MSHH === MSHH);
    if (exist) {
      if (quantity) {
        localStorage.setItem(
          "cartItems",
          JSON.stringify(
            getData().map((x) =>
              x.MSHH === MSHH
                ? { ...exist, SoLuong: exist.SoLuong + quantity }
                : x
            )
          )
        );
      } else {
        localStorage.setItem(
          "cartItems",
          JSON.stringify(
            getData().map((x) =>
              x.MSHH === MSHH ? { ...exist, SoLuong: exist.SoLuong + 1 } : x
            )
          )
        );
      }
    } else {
      if (quantity) {
        localStorage.setItem(
          "cartItems",
          JSON.stringify([...getData(), { MSHH, SoLuong: quantity }])
        );
      } else {
        localStorage.setItem(
          "cartItems",
          JSON.stringify([...getData(), { MSHH, SoLuong: 1 }])
        );
      }
    }
    setCartItems(getData());
  };

  //TODO: Remove items cart
  const removeCart = (MSHH) => {
    var exist = getData().find((x) => x.MSHH === MSHH);
    if (exist) {
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getData().filter((x) => x.MSHH !== MSHH))
      );
    }
    setCartItems(getData());
  };

  const removeOneItemCart = (MSHH) => {
    var exist = getData().find((x) => x.MSHH === MSHH);
    if (exist.SoLuong > 1) {
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          getData().map((x) =>
            x.MSHH === MSHH ? { ...exist, SoLuong: exist.SoLuong - 1 } : x
          )
        )
      );
    }
    setCartItems(getData());
  };

  //TODO: Delete cart
  const deleteCart = () => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa ?",
      text: "Bạn không thể hoàn tác hành động này !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Tiếp tục xóa",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("cartItems", JSON.stringify([]));
        Swal.fire("Đã xóa !", `Giỏ hàng đã được xóa thành công !`, "success");
        setCartItems(getData());
      }
    });
  };

  //TODO: Delete Order
  const deleteCheckOut = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Bạn có chắc muốn hủy đơn hàng ?",
      text: "Bạn không thể hoàn tác hành động này !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Tiếp tục xóa",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("cartItems", JSON.stringify([]));
        Swal.fire(
          "Đã hủy đơn hàng !",
          `Đơn hàng đã hủy thành công !`,
          "success"
        );
        setCartItems(getData());
      }
    });
  };

  //TODO: Delete after order or logout
  const deleteCartAfterCheckOut = () => {
    localStorage.setItem("cartItems", JSON.stringify([]));
    setCartItems(getData());
  };

  return (
    <div>
      <Router>
        <Header
          cartItems={cartItems.length}
          deleteCartAfterCheckOut={deleteCartAfterCheckOut}
        />

        <Switch>
          <Route exact path="/">
            <Home addCart={addCart} />
          </Route>
          <Route path="/tat-ca-san-pham">
            <AllProducts addCart={addCart} />
          </Route>
          <Route path="/chi-tiet-san-pham-1/:id">
            <ProductDetails addCart={addCart} data={productsData} />
          </Route>
          <Route path="/chi-tiet-san-pham/:id">
            <ProductDetailsAPI
              addCart={addCartByQuantity}
              addCheckOut={addCheckOutByQuantity}
            />
          </Route>
          <Route path="/dang-nhap">
            <Login />
          </Route>
          <Route path="/dang-ky">
            <Register />
          </Route>
          <Route path="/gio-hang">
            <Cart
              cartItems={cartItems}
              addCart={addCart}
              removeCart={removeCart}
              removeOneItemCart={removeOneItemCart}
              deleteCart={deleteCart}
            />
          </Route>
          <Route path="/thanh-toan">
            <CheckOut
              cartItems={cartItems}
              deleteCartAfterCheckOut={deleteCartAfterCheckOut}
              deleteCheckOut={deleteCheckOut}
            />
          </Route>
          <Route path="/thong-tin-khach-hang">
            {user ? <Profile /> : <Login />}
          </Route>
          <Route path="/admin">{user ? <Admin /> : <Login />}</Route>
          <Route path="/quan-ly-don-hang">
            {user ? <AdminOrderDetails /> : <Login />}
          </Route>
          <Route path="/tim-kiem">
            <Search addCart={addCart} />
          </Route>
          <Route path="/chi-tiet-don-hang">
            {user ? <CustomerOrderDetails /> : <Login />}
          </Route>
          <Route path="/tin-cong-nghe">
            <Posts />
          </Route>
          <Route path="/gioi-thieu">
            <Introduce />
          </Route>
          <Route path="/lien-he">
            <Contact />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
        </Switch>
        <Footer />
        <ScrollTop />

        {/* <iframe
          style={{
            position: "fixed",
            background: "none",
            bottom: "100px",
            right: "0",
            width: "30%",
            height: "100%",
            border: "none",
          }}
          src="http://127.0.0.1:5000"
          title="ChatBot"
        ></iframe> */}
      </Router>
    </div>
  );
}

export default App;
