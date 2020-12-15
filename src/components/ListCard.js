import React, { Component } from "react";
import { Link } from "react-router-dom";
import withCartContext from "../context/withCartContext";
import authService from "./../lib/auth-service";
class ListCard extends Component {
  constructor() {
    super();
    this.state = {
      products: "",
      favourites: [],
    };
  }
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
    // console.log("props from ListCard :>> ", this.props);
    const product = this.props.product;
    const imgWidth = "200";
    const imgHeight = "200";
    return (
      <div className="listCard">
        <Link to={"/productDetail/" + product._id}>
          <div>
            <img
              src={`https://res.cloudinary.com/dps0lnavi/image/upload/w_${imgWidth},h_${imgHeight},c_scale/v1607543765/${product.image.toLowerCase()}_1.jpg`}
              alt=""
              className="productListImg"
            />
          </div>
          <div className="productDetailName">
            <p className="productListItem">{product.name}</p>
            <p className="productListPrice">{product.price} €</p>
          </div>
        </Link>
      </div>
    );
  }
}

export default withCartContext(ListCard);
