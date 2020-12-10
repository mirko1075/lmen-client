import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiService from "./../lib/api-service";

class MenuCategories extends Component {
  state = {
    categories: [],
  };
  componentDidMount() {
    this.getAllCategories();
  }
  getAllCategories() {
    apiService
      .getCategories()
      .then((categoriesFound) => {
        const categories = categoriesFound.data;
        this.setState({ categories });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const categories = [...this.state.categories];
    return (
      <div>
        {categories &&
          categories.map((category) => {
            return <Link key={category}>{category} </Link>;
          })}
      </div>
    );
  }
}

export default MenuCategories;
