import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Context from "./context/cart-context";
import apiService from "./lib/api-service";
import authService from "./lib/auth-service";

// Importing mcomponents //
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {},
      products: [],
    };
    this.routerRef = React.createRef();
  }

  componentDidMount() {
    let user,
      products,
      cart = null;
    apiService
      .getAll()
      .then((productsFound) => {
        console.log("All products :>> ", productsFound);
        products = productsFound;
        const pr = authService.me();
        return pr;
      })
      .then((foundUser) => {
        user = foundUser;
        user = user ? JSON.parse(user) : null;
        const pr = authService.getCart();
        return pr;
      })
      .then((foundCart) => {
        cart = foundCart;
        cart = cart ? JSON.parse(cart) : {};

        this.setState({ user, products: products.data, cart });
      })
      .catch((err) => {});
  }

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products }, () => callback && callback());
  };

  addToCart = (cartItem) => {
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }
    authService
      .setCart(cart)
      .then((cart) => {
        this.setState({ cart });
      })
      .catch((err) => {});
  };

  removeFromCart = (cartItemId) => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    apiService
      .setCart(cart)
      .then((cart) => {
        this.setState({ cart });
      })
      .catch((err) => {});
  };

  clearCart = () => {
    let cart = {};
    apiService
      .setCart(cart)
      .then((cart) => {
        this.setState({ cart });
      })
      .catch((err) => {});
  };
  checkout = () => {
    if (!this.state.user) {
      this.routerRef.current.history.push("/login");
      return;
    }

    const cart = this.state.cart;
    /// TO CHECK
    const products = this.state.products.map((p) => {
      if (cart[p.name]) {
        p.stock = p.stock - cart[p.name].amount;

        // axios.put(`http://localhost:3001/api/products/${p.id}`, { ...p });
      }
      return p;
    });

    this.setState({ products });
    this.clearCart();
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
