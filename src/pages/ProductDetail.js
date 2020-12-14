import React, { Component } from "react";
import apiService from "./../lib/api-service";
import authService from "./../lib/auth-service";
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
    favorites: [],
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
    console.log("UpdateReviews running");
    this.getOneProduct(id);
  };
  getOneProduct = (id) => {
    apiService
      .getOne(id)
      .then((product) => {
        // console.log("product.review :>> ", product.review);
        const review = product.review;
        let favorites = product.favorites;
        let isFavorite = false;
        if (!favorites) favorites = [];
        favorites.length && favorites.includes(id)
          ? (isFavorite = true)
          : (isFavorite = false);
        this.setState({ product, review, favorites, isFavorite });

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
    // console.log("updateReviews from AddReview:>> ", updateReviews);
    // console.log("this.state from AddReview :>> ", this.state);
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
      })
      .catch((err) => {});
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
    let isFavorite = this.state.isFavorite;
    return (
      <div className="productDetail">
        <DetailCard
          isFavorite={isFavorite}
          addToFavorites={this.addToFavorites}
          removeFromFavorites={this.removeFromFavorites}
          product={this.state.product}
          review={this.state.review}
        />
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
    );
  }
}

export default withAuth(ProductDetail);
