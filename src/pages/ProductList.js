import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiService from "./../lib/api-service";

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
      <div>
        {productList &&
          productList.map((elem) => {
            return (
              <div key={elem._id}>
                <Link to={"/ProductDetail/" + elem._id}>{elem.name}</Link>
              </div>
            );
          })}
      </div>
    );
  }
}

export default ProductList;
