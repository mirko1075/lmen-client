import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ShoppingCart from "./pages/ShoppingCart";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import ViewProfile from "./pages/ViewProfile";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      category: "",
    };
  }

  render() {
    const category = this.state.category;
    return (
      <div className="container">
        <header>
          <Navbar category={category} changeCategory={this.changeCategory} />
        </header>
        <div className="pageContent">
          <Switch>
            <Route exact path="/" category={category} component={ProductList} />
            <Route
              exact
              path="/ProductList"
              category={category}
              component={ProductList}
            />
            <Route exact path="/Home" component={Home} />
            <Route exact path="/ProductDetail/:id" component={ProductDetail} />
            <Route exact path="/category/:id" component={ProductList} />
            <AnonRoute exact path="/signup" component={Signup} />
            <AnonRoute exact path="/login" component={Login} />
            <PrivateRoute
              exact
              path="/private/ViewProfile"
              component={ViewProfile}
            />
            <PrivateRoute
              exact
              path="/private/EditProfile"
              component={EditProfile}
            />
            <PrivateRoute
              exact
              path="/private/ShoppingCart"
              component={ShoppingCart}
            />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
