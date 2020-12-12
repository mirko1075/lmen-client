import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Context from "./context/cart-context";
import apiService from "./lib/api-service";
import authService from "./lib/auth-service";

// Importing PAGES //

import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import ViewProfile from "./pages/ViewProfile";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
// Importing COMPONENTS //
import Navbar from "./components/Navbar";
import AddProduct from "./components/AddProduct";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
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
        // console.log("All products :>> ", productsFound);
        products = productsFound;
        const pr = authService.me();
        return pr;
      })
      .then((foundUser) => {
        console.log("FoundUser :>> ", foundUser);
        user = foundUser;

        const pr = authService.getCart();
        return pr;
      })
      .then((foundCart) => {
        cart = foundCart;
        console.log("cart from App componentDidMount :>> ", cart);
        this.setState({ user, products: products.data, cart });
      })
      .catch((err) => {
        console.log("Error componentDidMount APP :>> ", err);
      });
  }

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products }, () => callback && callback());
  };

  addToCart = (cartItem) => {
    // console.log("this.state.cart :>> ", this.state.cart);
    let cart = this.state.cart;
    // console.log("cartItem :>> ", cartItem);

    // console.log("cart in state before update :>> ", cart);
    let foundElement = false;
    for (let i = 0; i < cart.length; i++) {
      const element = cart[i];

      if (
        element.id === cartItem.id &&
        element.amount + cartItem.amount <= element.product.stock
      ) {
        // console.log("HERE");
        element.amount += cartItem.amount;
        foundElement = true;
      }
    }
    if (!foundElement) {
      // console.log("cart item to push :>> ", cartItem);
      cart.push(cartItem);
    }
    // console.log("Cart after updating Arr :>> ", cart);

    authService
      .setCart({ cart })
      .then((cart) => {
        this.setState(cart);
        // console.log("this.state.cart after updating DB :>> ", this.state.cart);
      })
      .catch((err) => {});
  };

  removeFromCart = (cartItemId) => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    authService
      .setCart(cart)
      .then((cart) => {
        this.setState(cart);
      })
      .catch((err) => {});
  };

  clearCart = () => {
    let cart = [];
    authService
      .setCart({ cart })
      .then((cart) => {
        this.setState({ cart: [] });
        console.log("this.state :>> ", this.state);
      })
      .catch((err) => {});
  };

  checkout = () => {
    if (!this.state.user) {
      this.routerRef.current.history.push("/private/Checkout");
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
              <PrivateRoute exact path="/private/Cart" component={Cart} />
              <PrivateRoute
                exact
                path="/private/Checkout"
                component={Checkout}
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
