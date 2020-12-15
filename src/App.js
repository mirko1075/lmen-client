import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Context from "./context/cart-context";
import apiService from "./lib/api-service";
import authService from "./lib/auth-service";

// Importing PAGES //

import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import ViewProfile from "./pages/ViewProfile";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import About from "./pages/About";
import Checkout from "./pages/Checkout";

// Importing COMPONENTS //
import Navbar from "./components/Navbar";
import AddProduct from "./components/AddProduct";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage.js";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      cart: [],
      products: [],
      cartElements: 0,
    };
    this.routerRef = React.createRef();
  }

  componentDidMount() {
    let user,
      products,
      cart = null;
    let favourites = [];
    let cartElements = 0;
    apiService
      .getAll()
      .then((productsFound) => {
        // console.log("All products :>> ", productsFound);
        products = productsFound;
        const pr = authService.me();
        return pr;
      })
      .then((foundUser) => {
        // console.log("FoundUser :>> ", foundUser);
        if (foundUser) {
          user = foundUser;
          favourites = user.favourites;
        } else {
          user = null;
        }

        const pr = authService.getCart();
        return pr;
      })
      .then((foundCart) => {
        cart = foundCart;
        cartElements ? (cartElements += foundCart.amount) : (cartElements = 0);
        // console.log("cart from App componentDidMount :>> ", cart);
        this.setState({ user, products, cart, cartElements, favourites });
      })
      .catch((err) => {
        console.log("Error componentDidMount APP :>> ", err);
      });
  }

  addToCart = (cartItem) => {
    // console.log("this.state.cart :>> ", this.state.cart);
    let cart = this.state.cart;
    let cartElements = this.state.cartElements;
    // console.log("cartItem :>> ", cartItem);

    // console.log("cart in state before update :>> ", cart);
    let foundElement = false;
    for (let i = 0; i < cart.length; i++) {
      const element = cart[i];

      if (
        element.id === cartItem.id &&
        element.amount + cartItem.amount <= element.product.stock
      ) {
        console.log("HERE");
        element.amount += cartItem.amount;
        // console.log("element.amount :>> ", element.amount, cartElements);
        cartElements
          ? (cartElements += element.amount)
          : (cartElements = element.amount);
        this.setState({ cartElements });
        foundElement = true;
      }
    }
    if (!foundElement) {
      // console.log("cart item to push :>> ", cartItem);

      cart.push(cartItem);
    }
    // console.log("Cart after updating Arr :>> ", cart);
    // I'm gonna update only at checkout
    // authService
    //   .setCart(cart)
    //   .then((userUpdated) => {
    //     console.log("cart from APP set Cart :>> ", cart);
    //     this.setState({ cart });
    //     console.log("this.state.cart after updating DB :>> ", this.state);
    //   })
    //   .catch((err) => {});
  };

  removeFromCart = (cartItemId) => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    authService
      .setCart(cart)
      .then((userUpdated) => {
        // console.log("cart from APP set Cart :>> ", cart);
        this.setState({ cart });
        // console.log("this.state.cart after updating DB :>> ", this.state);
      })
      .catch((err) => {});
  };

  clearCart = () => {
    let cart = [];
    authService
      .setCart(cart)
      .then((userUpdated) => {
        // console.log("cart from APP set Cart :>> ", cart);
        let cartElements = 0;
        this.setState({ cart, cartElements });
        // console.log("this.state.cart after updating DB :>> ", this.state);
      })
      .catch((err) => {});
  };

  checkout = () => {
    if (!this.state.user) {
      this.routerRef.current.history.push("/login");
      return;
    }

    const cart = this.state.cart;

    const products = this.state.products.map((p) => {
      if (cart[p.name]) {
        p.stock = p.stock - cart[p.name].amount;
        authService
          .setAmount(p.name, p.stock)
          .then((userUpdated) => {
            // console.log("cart from APP set Cart :>> ", cart);
            let cartElements = 0;
            this.setState({ cart, cartElements });
            // console.log("this.state.cart after updating DB :>> ", this.state);
          })
          .catch((err) => {});
      }
      return p;
    });

    this.setState({ products });
    this.clearCart();
  };
  addToFavourites = (productId, callback) => {
    console.log("this.state from Home addToFav :>> ", this.state);
    let favourites = this.state.favourites;
    let isFavorite = this.state.isFavorite;
    console.log("favourites :>> ", favourites);

    const pr = authService
      .postFavorite(productId, favourites)
      .then((user) => {
        console.log("Added to favourite created updated user:>> ", user);
        favourites.push(productId);
        isFavorite = true;
        this.setState({ favourites, isFavorite }, () => callback && callback());
        return pr;
      })
      .catch((err) => {});
  };
  // // FOR ADDING PRODUCTS FROM ADMIN FORM
  // addProduct = (product, callback) => {
  //   let products = this.state.products.slice();
  //   products.push(product);
  //   this.setState({ products }, () => callback && callback());
  // };

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
              <AnonRoute exact path="/login" component={Login} />
              <Route exact path="/Home" component={Home} />
              <Route
                exact
                path="/ProductList"
                category={category}
                component={ProductList}
              />
              <Route exact path="/About" component={About} />
              <Route
                exact
                path="/ProductDetail/:id"
                component={ProductDetail}
              />
              <Route exact path="/category/:id" component={ProductList} />
              <Route
                exact
                path="/ProductList/category/:category"
                component={ProductList}
              />
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
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </div>
          {/* <Footer /> */}
        </div>
      </Context.Provider>
    );
  }
}

export default App;
