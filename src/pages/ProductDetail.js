import React, { Component } from "react";
import { Link } from "react-router-dom";

import apiService from "./../lib/api-service";
import authService from "./../lib/auth-service";
import withCartContext from "../context/withCartContext";

import ReviewCard from "../components/ReviewCard";
import DetailCard from "../components/DetailCard";
import { withAuth } from "./../context/auth-context";

class ProductDetail extends Component {
  state = {
    product: [],
    review: [],
    showAddReview: false,
    title: "",
    message: "",
    rate: "",
    favourites: [],
    isFavorite: false,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.getOneProduct(id);
  }
  showAddReview = () => {
    this.state.showAddReview
      ? this.setState({ showAddReview: false })
      : this.setState({ showAddReview: true });
  };
  updateReviews = (id) => {
    // console.log("UpdateReviews running");
    this.getOneProduct(id);
  };
  getOneProduct = (id) => {
    apiService
      .getOne(id)
      .then((product) => {
        // console.log("product.review :>> ", product.review);
        let review = product.review;
        if (review) review = [];
        console.log("######review :>> ", review);
        let favourites = product.favourites;
        let isFavorite = false;
        if (!favourites) favourites = [];
        favourites.length && favourites.includes(id)
          ? (isFavorite = true)
          : (isFavorite = false);
        this.setState({ product, review, favourites, isFavorite });

        // console.log("ProductDetail state :>> ", this.state);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("name :>> ", name, "value", value);
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const updateReviews = this.state.review;
    console.log("updateReviews from AddReview:>> ", updateReviews);
    console.log("this.state from AddReview :>> ", this.state);
    const pr = apiService
      .postReview(
        this.state.product._id,
        this.state.title,
        this.state.message,
        this.state.rate
      )
      .then((review) => {
        console.log("Review created :>> ", review);
        updateReviews.push(review);
        this.setState({ review: updateReviews });
        return pr;
      })
      .catch((err) => {});
  };
  addToFavourites = (productId, callback) => {
    // console.log("this.state from Product Detail addToFav :>> ", this.state);
    let favourites = this.state.favourites;
    let isFavorite = this.state.isFavorite;
    // console.log("favourites :>> ", favourites);

    const pr = authService
      .postFavorite(productId, favourites)
      .then((user) => {
        // console.log("Added to favourite created updated user:>> ", user);
        favourites.push(productId);
        isFavorite = true;
        this.setState({ favourites, isFavorite }, () => callback && callback());
        return pr;
      })
      .catch((err) => {});
  };
  removeFromFavourites = (productId, callback) => {
    // console.log("this.state from Product Detail addToFav :>> ", this.state);
    let favourites = this.state.favourites;
    let isFavorite = this.state.isFavorite;
    // console.log("favourites :>> ", favourites);
    favourites.splice(favourites.indexOf(productId), 1);
    isFavorite = false;
    this.setState({ favourites, isFavorite }, () => callback && callback());
  };

  render() {
    let isFavorite = this.state.isFavorite;
    const addToCart = this.props.context.addToCart;
    console.log("this.state from ProductDetail :>> ", this.state);
    return (
      <div className="productDetail">
        <div className="productDetailLeft">
          <div>
            <DetailCard
              isFavorite={isFavorite}
              addToFavourites={this.addToFavourites}
              removeFromFavourites={this.removeFromFavourites}
              product={this.state.product}
              review={this.state.review}
            />
            <ReviewCard
              product={this.state.product}
              review={this.state.review}
            />
          </div>
          <div className="reviewBlock">
            <div>
              <button onClick={this.showAddReview}>
                {this.state.showAddReview ? "Hide form" : "Add Review"}
              </button>
            </div>
            {this.state.showAddReview ? (
              <div>
                <form onSubmit={this.handleSubmit}>
                  <div>
                    <label htmlFor="title">Title</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="message">Message</label>
                  </div>
                  <div>
                    <input
                      type="textarea"
                      cols="10"
                      lines="10"
                      name="message"
                      id="message"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="rate">rate</label>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="rate"
                      min="1"
                      max="5"
                      id="rate"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <input type="submit" value="Add it" />
                  </div>
                </form>
              </div>
            ) : null}
          </div>
        </div>
        <div className="productDetailRight">
          <div>
            {/* SHOPPING */}
            <div>
              <b style={{ textTransform: "capitalize" }}>
                {this.state.product.name}
                {" - COD: "}
                {this.state.product.image}
              </b>
            </div>
            <div>
              <b>Description: </b>
              {this.state.product.description}
            </div>
            <div>
              <b>Materials: </b>
              {this.state.product.material}
            </div>
            <div>
              <b>Technic: </b>
              {this.state.product.technic ? this.state.product.technic : "N/A"}
            </div>
            <div>
              <b>Dimensions: </b>
              {this.state.product.dimensions}
            </div>
            <div>
              <b>Rating: </b>
              {this.state.product.rating}
            </div>
            {this.state.product.stock > 0 ? (
              <small>{this.state.product.stock + " Available"}</small>
            ) : (
              <small className="">Out Of Stock</small>
            )}

            <div className="">
              <span className="">€ {this.state.product.price} </span>
              <button
                className=""
                onClick={() =>
                  addToCart({
                    id: this.sproduct._id,
                    product: this.product,
                    amount: 1,
                  })
                }
              >
                Add to Cart
              </button>
              <Link to="/private/cart">See cart</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withCartContext(withAuth(ProductDetail));
