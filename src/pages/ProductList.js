import React, { Component } from "react";
import withCartContext from "../context/withCartContext";
import authService from "./../lib/auth-service";
import apiService from "./../lib/api-service";
import { withAuth } from "./../context/auth-context";
import ListCard from "./../components/ListCard";
import MenuCategories from "./../components/MenuCategories";
class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      products: "",
      favorites: [],
    };
  }
  componentDidMount() {
    const { category } = this.props.match.params;
    console.log("this props from didMount :>> ", this.props.match.params);
    category ? this.getCategoryProducts(category) : this.getAllProducts();
    this.setState({ favourites: this.props.user.favorites });
  }

  getAllProducts = () => {
    apiService
      .getAll()
      .then((products) => {
        // console.log("All products :>> ", products);
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
        // console.log("Products for categories :>> ", products);
        this.setState({ products });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  addToFavorites = (productId, callback) => {
    console.log("this.state from Product Detail addToFav :>> ", this.state);
    let favorites = this.state.favorites;
    let isFavorite = this.state.isFavorite;
    console.log("favorites :>> ", favorites);

    const pr = authService
      .postFavorite(productId, favorites)
      .then((user) => {
        console.log("Added to favourite created updated user:>> ", user);
        favorites.push(productId);
        isFavorite = true;
        this.setState({ favorites, isFavorite }, () => callback && callback());
        return pr;
      })
      .catch((err) => {});
  };
  removeFromFavorites = (productId, callback) => {
    console.log("this.state from Product Detail addToFav :>> ", this.state);
    let favorites = this.state.favorites;
    let isFavorite = this.state.isFavorite;
    console.log("favorites :>> ", favorites);
    favorites.splice(favorites.indexOf(productId), 1);
    isFavorite = false;
    this.setState({ favorites, isFavorite }, () => callback && callback());
  };
  render() {
    console.log("this.props from product List :>> ", this.props.context);
    let isFavorite = false;
    const productList = this.state.products;
    return (
      <div className="productListContDiv">
        <div className="menuCategories">
          <MenuCategories getCategoryProducts={this.getCategoryProducts} />
        </div>
        {productList &&
          productList.map((elem) => {
            this.state.favorites.includes(elem._id)
              ? (isFavorite = true)
              : (isFavorite = false);
            return (
              <div key={elem._id}>
                <ListCard
                  addToFavorites={this.addToFavorites}
                  removeFromFavorites={this.removeFromFavorites}
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
export default withCartContext(withAuth(ProductList));
