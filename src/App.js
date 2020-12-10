import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ShoppingCart from "./pages/ShoppingCart";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div className="container">
        <header>
          <Navbar />
        </header>
        <div className="pageContent">
          <Switch>
            <Route exact path="/ProductList" component={ProductList} />
            <Route exact path="/ProductDetail/:id" component={ProductDetail} />
            <AnonRoute exact path="/signup" component={Signup} />
            <AnonRoute exact path="/login" component={Login} />

            <PrivateRoute exact path="/ShoppingCart" component={ShoppingCart} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
