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
import AddProduct from "./components/AddProduct";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import Context from "./context/cart-context";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {},
      products: [],
    };
    this.routerRef = React.createRef();
  }
  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products }, () => callback && callback());
  };
  render() {
    const category = this.state.category;
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout,
        }}
      >
        <div className="container">
          <header>
            <Navbar category={category} changeCategory={this.changeCategory} />
          </header>
          <div className="pageContent">
            <Switch>
              <Route
                exact
                path="/"
                category={category}
                component={ProductList}
              />
              <Route
                exact
                path="/ProductList"
                category={category}
                component={ProductList}
              />
              <Route exact path="/Home" component={Home} />
              <Route
                exact
                path="/ProductDetail/:id"
                component={ProductDetail}
              />
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
              <PrivateRoute
                exact
                path="/private/AddProduct"
                component={AddProduct}
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </Context.Provider>
    );
  }
}

export default App;
