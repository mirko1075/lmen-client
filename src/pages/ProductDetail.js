import React, { Component } from "react";
import { Link } from "react-router-dom";

import apiService from "./../lib/api-service";
import authService from "./../lib/auth-service";
import withCartContext from "../context/withCartContext";
import ReviewCard from "../components/ReviewCard";
import DetailCard from "../components/DetailCard";
import AddReview from "../components/AddReview";
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
    userId: "",
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
        let review = product.review;
        if (!review) review = [];
        let favourites = product.favourites;
        let isFavorite = false;
        if (!favourites) favourites = [];
        favourites.length && favourites.includes(id)
          ? (isFavorite = true)
          : (isFavorite = false);
        let userId = "";
        this.props.user ? (userId = this.props.user._id) : (userId = "");
        this.setState({ product, review, favourites, isFavorite, userId });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const updateReviews = this.state.review;
    const { product, title, message, rate } = this.state;
    const pr = apiService
      .postReview(product._id, title, message, rate)
      .then((review) => {
        console.log("Review created :>> ", review);
        updateReviews.push(review);
        this.setState({ review: updateReviews });
        return pr;
      })
      .catch((err) => {
        console.log("Error creating review :>> ", err);
      });
  };

  addToFavourites = (productId, callback) => {
    let favourites = this.state.favourites;
    let isFavorite = this.state.isFavorite;
    const pr = authService
      .postFavorite(productId, favourites)
      .then((user) => {
        favourites.push(productId);
        isFavorite = true;
        this.setState({ favourites, isFavorite }, () => callback && callback());
        return pr;
      })
      .catch((err) => {
        console.log("Error posting favourite :>> ", err);
      });
  };

  removeFromFavourites = (productId, callback) => {
    let favourites = this.state.favourites;
    let isFavorite = this.state.isFavorite;
    const pr = authService
      .postFavorite(productId, favourites)
      .then((user) => {
        favourites.splice(favourites.indexOf(productId), 1);
        isFavorite = false;
        this.setState({ favourites, isFavorite }, () => callback && callback());
        return pr;
      })
      .catch((err) => {
        console.log("Error posting favourite :>> ", err);
      });
  };

  deleteReview = (id) => {
    let reviewsArr = this.state.review;
    let userId = this.state.userId;
    let productId = this.state.product._id;
    const reviewsArrMod = reviewsArr.filter((review) => {
      return review._id != id;
    });
    const pr = apiService
      .deleteReview(id, productId)
      .then((review) => {
        this.setState({ review: reviewsArrMod });
        return pr;
      })
      .catch((err) => {});
  };

  render() {
    let isFavorite = this.state.isFavorite;
    const addToCart = this.props.context.addToCart;
    let userId = "";
    if (this.props.user) userId = this.props.user._id;
    return (
      <>
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
                deleteReview={this.deleteReview}
                userId={userId}
              />
            </div>
            {this.props.user ? (
              <div>
                <div className="reviewBlockItems">
                  <button onClick={this.showAddReview}>
                    {this.state.showAddReview ? "Hide form" : "Add Review"}
                  </button>
                </div>
                {this.state.showAddReview ? (
                  <AddReview
                    product={this.state.product}
                    updateReviews={this.updateReviews}
                  />
                ) : null}
              </div>
            ) : null}
          </div>
          <div>
            <hr className="verticalHr" />
          </div>
          <div className="productDetailRight">
            <div>
              {/* SHOPPING */}
              <div className="productDetailInfo">
                <b>
                  {this.state.product.name}
                  {" - COD: "}
                  {this.state.product.image}
                </b>

                {this.props.user ? (
                  <div>
                    <p>Save it as favourite</p>
                    {this.state.isFavorite ? (
                      <button
                        onClick={() =>
                          this.removeFromFavourites(this.state.product._id)
                        }
                      >
                        ❤️
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          this.addToFavourites(this.state.product._id)
                        }
                      >
                        🖤
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
              <div className="productDetailInfo">
                <b>Description: </b>
                {this.state.product.description}
              </div>
              <div className="productDetailInfo">
                <b>Materials: </b>
                {this.state.product.material}
              </div>
              <div className="productDetailInfo">
                <b>Technic: </b>
                {this.state.product.technic
                  ? this.state.product.technic
                  : "N/A"}
              </div>
              <div className="productDetailInfo">
                <b>Dimensions: </b>
                {this.state.product.dimensions}
              </div>
              <div className="productDetailInfo">
                <b>Rating: </b>
                {this.state.product.numReviews
                  ? Math.round(
                      Number(this.state.product.rating) /
                        Number(this.state.product.numReviews)
                    )
                  : this.state.product.rating}
              </div>
              <div className="productDetailInfo">
                {this.state.product.stock > 0 ? (
                  <small>{this.state.product.stock + " Available"}</small>
                ) : (
                  <small className="">Out Of Stock</small>
                )}
              </div>
              <div className="productDetailInfo">
                <span className="">€ {this.state.product.price} </span>
              </div>
              <div className="productDetailInfo">
                <button
                  className=""
                  onClick={() =>
                    addToCart({
                      id: this.state.product._id,
                      product: this.state.product,
                      amount: 1,
                    })
                  }
                >
                  Add to Cart
                </button>
                {"   "}
                <Link to="/private/cart">See cart</Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withCartContext(withAuth(ProductDetail));
