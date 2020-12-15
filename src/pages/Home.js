import React, { Component } from "react";
import withCartContext from "../context/withCartContext";
import authService from "./../lib/auth-service";

import apiService from "../lib/api-service";
import ListCard from "../components/ListCard";
import MenuCategories from "../components/MenuCategories";
class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      products: "",
      favourites: [],
    };
  }
  componentDidMount() {
    const category = this.props.category;
    // console.log("this props from didMount :>> ", this.props);
    category ? this.getCategoryProducts(category) : this.getAllProducts();
  }

  getAllProducts = () => {
    apiService
      .getAll()
      .then((products) => {
        console.log("All products :>> ", products);
        this.setState({ products });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getCategoryProducts = (category) => {
    apiService
      .getForCategories(category)
      .then((products) => {
        console.log("Products for categories :>> ", products);
        this.setState({ products });
      })
      .catch((err) => {
        console.log(err);
      });
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
  removeFromFavourites = (productId, callback) => {
    console.log("this.state from Home removeFromFav :>> ", this.state);
    let favourites = this.state.favourites;
    let isFavorite = this.state.isFavorite;
    console.log("favourites :>> ", favourites);
    favourites.splice(favourites.indexOf(productId), 1);
    isFavorite = false;
    this.setState({ favourites, isFavorite }, () => callback && callback());
  };
  render() {
    console.log("this.props from Home :>> ", this.props.context);
    let isFavorite = false;
    const productList = this.state.products;
    return (
      <div className="productListContDiv">
        <div className="menuCategories">
          <MenuCategories getCategoryProducts={this.getCategoryProducts} />
        </div>
        {productList &&
          productList.map((elem) => {
            return (
              <div key={elem._id}>
                <ListCard
                  addToFavourites={this.addToFavourites}
                  removeFromFavourites={this.removeFromFavourites}
                  isFavorite={isFavorite}
                  product={elem}
                />
              </div>
            );
          })}
      </div>
    );
  }
}

// export default withProducts(ProductList);
export default withCartContext(ProductList);
