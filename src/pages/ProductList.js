import React, { Component } from "react";

import apiService from "./../lib/api-service";
import ListCard from "./../components/ListCard";
import MenuCategories from "./../components/MenuCategories";

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
      <div className="productListDiv">
        <img
          src={
            "https://res.cloudinary.com/dps0lnavi/image/upload/v1607598662/Logo_lmen.png"
          }
          alt=""
        />
        <div className="productListContDiv">
          <div className="menuCategories">
            <MenuCategories />
          </div>

          {productList &&
            productList.map((elem) => {
              return (
                <div key={elem._id}>
                  <ListCard product={elem} />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default ProductList;
