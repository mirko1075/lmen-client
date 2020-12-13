import React, { Component } from "react";
import apiService from "./../lib/api-service";
import DetailCard from "../components/DetailCard";
import AddReview from "../components/AddReview";

class ProductDetail extends Component {
  state = {
    product: [],
    review: [],
    showAddReview: false,
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
        this.setState({ product, review });

        // console.log("ProductDetail state :>> ", this.state);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <DetailCard product={this.state.product} review={this.state.review} />
        <div>
          <button onClick={this.showAddReview}>
            {this.state.showAddReview ? "Hide form" : "Add Review"}
          </button>
        </div>
        {this.state.showAddReview ? (
          <AddReview
            updateReviews={this.updateReviews}
            product={this.state.product}
            review={this.state.review}
          />
        ) : null}
        <br />
        <br />
        <br /> <br />
        <br />
        <br /> <br />
        <br />
        <br />
      </div>
    );
  }
}

export default ProductDetail;
