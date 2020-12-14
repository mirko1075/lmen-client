import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiService from "./../lib/api-service";
// import { withProducts } from "../context/old-products-context";
class MenuCategories extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }
  componentDidMount() {
    this.getAllCategories();
  }
  getAllCategories = () => {
    apiService
      .getCategories()
      .then((categoriesFound) => {
        const categoriesArr = categoriesFound.data;
        this.setState({ categories: categoriesArr });
      })
      .catch((err) => {
        console.log("err from getAllCategories", err);
      });
  };
  render() {
    const categories = this.state.categories;
    const getCategoryProducts = this.props.getCategoryProducts;
    return (
      <div>
        {categories &&
          categories.map((category) => {
            return (
              <Link
                to={"/ProductList/category/" + category}
                onClick={() => getCategoryProducts(category)}
                key={category}
              >
                {category}
              </Link>
            );
          })}
      </div>
    );
  }
}
//              <Link onClick={() => changeCategory(category)} key={category}>
// export default withProducts(MenuCategories);
export default MenuCategories;
