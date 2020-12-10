import React, { Component } from "react";

import apiService from "./../lib/api-service";
import ListCard from "./../components/ListCard";

class ProductList extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.getAllProducts();
  }
  getAllProducts() {
    apiService
      .getAll()
      .then((products) => {
        this.setState({ products });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    console.log("this.state :>> ", this.state);
    const productList = this.state.products;
    return (
      <div className="productListContDiv">
        {productList &&
          productList.map((elem) => {
            return (
              <div key={elem._id}>
                <ListCard product={elem} />
              </div>
            );
          })}
      </div>
    );
  }
}

export default ProductList;
