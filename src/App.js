import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
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
import Edit from "./pages/Edit/Edit";
import AdminOrderDetails from "./pages/OrderDetails/AdminOrderDetails"
import CustomerOrderDetails from "./pages/OrderDetails/CustomerOrderDetails"

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/details">
            <Details />
          </Route>
          <Route path="/product-details/:id">
            <ProductDetails data={productsData} />
          </Route>
          <Route path="/product-details-api/:id">
            <ProductDetailsAPI />
          </Route>
          <Route path="/sign-in">
            <Login />
          </Route>
          <Route path="/sign-up">
            <Register />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/check-out">
            <CheckOut />
          </Route>
          <Route path="/profile">{user ? <Profile /> : <Login />}</Route>
          <Route path="/admin">{user ? <Admin /> : <Login />}</Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/edit">{user ? <Edit /> : <Login />}</Route>
          <Route path="/admin-order-details">{user ? <AdminOrderDetails /> : <Login />}</Route>
          <Route path="/order-details">{user ? <CustomerOrderDetails /> : <Login />}</Route>
        </Switch>
        <Footer />
        <ScrollTop />
      </Router>
    </div>
  );
}

export default App;
