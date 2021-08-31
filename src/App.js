import React from "react";
import "./App.css";
import "./grid.css"
import {BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from './pages/Home/Home';
import Footer from "./components/footer/Footer";
function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
