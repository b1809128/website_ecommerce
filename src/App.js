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
            <Route path="/sign-in">
                <Login />
            </Route>
        </Switch>
        <Footer/>
        <ScrollTop/>
      </Router>
    </div>
  );
}

export default App;
