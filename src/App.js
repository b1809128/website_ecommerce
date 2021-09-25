import React from "react";
import "./App.css";
// import "./grid.css"
import {BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Details from './pages/Details/Details';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ScrollTop from "./components/scrolltop/ScrollTop";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut";
import { productsData } from "./data";
function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route path="/details">
                <Details />
            </Route>
            <Route path="/product-details/:id">
                <ProductDetails data={productsData}/>
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
        </Switch>
        <Footer/>
        <ScrollTop/>
      </Router>
    </div>
  );
}

export default App;
