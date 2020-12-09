import React, { Component } from "react";
import apiService from "./../lib/api-service";
import DetailCard from "../components/DetailCard";
class ProductDetail extends Component {
  state = {
    product: [],
    review: [],
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.getOneProduct(id);
  }
  getOneProduct(id) {
    apiService
      .getOne(id)
      .then((product) => {
        console.log("product.review :>> ", product.review);
        const review = product.review;
        this.setState({ product, review });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const product = this.state.product;
    const review = this.state.review;

    return <DetailCard product={product} review={review} />;
  }
}

export default ProductDetail;
