import React, { Component } from "react";
import withCartContext from "../context/withCartContext";
import authService from "./../lib/auth-service";
import apiService from "./../lib/api-service";
import { withAuth } from "./../context/auth-context";
import ListCard from "./../components/ListCard";
import MenuCategories from "./../components/MenuCategories";
const img1 = "img1.jpg";
const img2 = "img2.jpg";
const img3 = "img3.jpg";
const img4 = "img4.jpg";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      products: [],
      favourites: [],
    };
  }
  componentDidMount() {
    let { category } = this.props.match.params;
    let favourites = [];
    // console.log("this props from didMount :>> ", this.props.match.params);
    !category && (category = "");
    category ? this.getCategoryProducts(category) : this.getAllProducts();
    this.props.user
      ? (favourites = this.props.user.favourites)
      : (favourites = []);
    this.setState({ favourites });
    this.slideImgs();
  }
  slideImgs() {
    const imagesArr = [img1, img2, img3, img4];
    const intervalID = setInterval(() => {
      var randomnumber = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
      let img = imagesArr[randomnumber];
      this.changeImg(img);
      // console.log("img :>> ", img);
    }, 2000);
    clearInterval(intervalID);
  }
  changeImg(img) {
    const image = import("../images/Carousel/" + img)
      .then((result) => {
        // console.log("image :>> ", result.default);
        this.setState({ image: result.default });
        // console.log("this.state :>> ", this.state);
      })
      .catch((err) => {});
  }

  getAllProducts = () => {
    apiService
      .getAll()
      .then((products) => {
        //console.log("All products :>> ", products);
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
  addToFavourites = (productId, callback) => {
    // console.log("this.state from Product Detail addToFav :>> ", this.state);
    let favourites = this.state.favourites;
    let isFavorite = this.state.isFavorite;
    // console.log("favourites :>> ", favourites);

    const pr = authService
      .postFavorite(productId, favourites)
      .then((user) => {
        // console.log("Added to favourite created updated user:>> ", user);
        favourites.push(productId);
        isFavorite = true;
        this.setState({ favourites, isFavorite }, () => callback && callback());
        return pr;
      })
      .catch((err) => {});
  };
  removeFromFavourites = (productId, callback) => {
    // console.log("this.state from Product Detail addToFav :>> ", this.state);
    let favourites = this.state.favourites;
    let isFavorite = this.state.isFavorite;
    // console.log("favourites :>> ", favourites);
    favourites.splice(favourites.indexOf(productId), 1);
    isFavorite = false;
    this.setState({ favourites, isFavorite }, () => callback && callback());
  };
  render() {
    let isFavorite = false;
    const productList = this.state.products;
    return (
      <div className="productListContDiv">
        <div className="carousel">
          <img src={this.state.image} alt="" className="caroselImg" />
        </div>
        <div className="menuCategories">
          <MenuCategories getCategoryProducts={this.getCategoryProducts} />
        </div>
        {productList &&
          productList.map((elem) => {
            this.state.favourites && this.state.favourites.includes(elem._id)
              ? (isFavorite = true)
              : (isFavorite = false);
            return (
              <div key={elem._id}>
                <ListCard
                  addToFavourites={this.addToFavourites}
                  removeFromFavourites={this.removeFromFavourites}
                  isFavorite={isFavorite}
                  product={elem}
                />
              </div>
            );
          })}
      </div>
    );
  }
}

// export default withProducts(ProductList);
export default withCartContext(withAuth(Home));
