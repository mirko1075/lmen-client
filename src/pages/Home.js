import React, { Component } from "react";
// import { withProducts } from "../context/old-products-context";
import apiService from "../lib/api-service";
import ListCard from "../components/ListCard";
import MenuCategories from "../components/MenuCategories";
class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      products: "",
    };
  }
  componentDidMount() {
    const category = this.props.category;
    // console.log("this props from didMount :>> ", this.props);
    category ? this.getCategoryProducts(category) : this.getAllProducts();
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
  render() {
    // console.log("this.props :>> ", this.props);
    const productList = this.state.products;
    return (
      <div className="productListContDiv">
        <div className="menuCategories">
          <MenuCategories getCategoryProducts={this.getCategoryProducts} />
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
    );
  }
}

// export default withProducts(ProductList);
export default ProductList;
