import React, { Component } from "react";
import { Link } from "react-router-dom";
import withCartContext from "../context/withCartContext";
import authService from "./../lib/auth-service";
class DetailCard extends Component {
  state = {
    product: {},
    review: [],
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
  };
  componentDidUpdate(prevProps) {
    const product = this.props.product;
    const review = this.props.review;
    if (this.props.product !== prevProps.product) {
      for (let i = 1; i <= 5; i++) {
        const imgName = "img" + i;
        this.setState({ [imgName]: this.props.product.image + "_" + i });
      }
      this.setState({ product, review });
    }
  }
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
      .catch((err) => {});
  };
  removeFromFavourites = (productId, callback) => {
    let favourites = this.state.favourites;
    let isFavorite = this.state.isFavorite;
    favourites.splice(favourites.indexOf(productId), 1);
    isFavorite = false;
    this.setState({ favourites, isFavorite }, () => callback && callback());
  };
  render() {
    const { product, review } = this.state;
    const imgWidth = "100";
    const imgHeight = "100";
    const addToCart = this.props.context.addToCart;

    return (
      <div className="detailCardCont">
        <div>
          {"Category >> "}
          <Link to={"/ProductList/category/" + product.category}>
            {product.category}
          </Link>
        </div>
        <div className="detailCard">
          <div>
            <div className="detailMainImg">
              <img
                src={`https://res.cloudinary.com/dps0lnavi/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1607543487/${product.image}_1.jpg`}
                alt=""
                className="detailImage"
              />
            </div>
            <div className="detailImgBox">
              <div>
                <img
                  src={`https://res.cloudinary.com/dps0lnavi/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1607543487/${this.state.img2}.jpg`}
                  alt=""
                  className="detailImage"
                />
              </div>
              <div>
                <img
                  src={`https://res.cloudinary.com/dps0lnavi/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1607543487/${this.state.img3}.jpg`}
                  alt=""
                  className="detailImage"
                />
              </div>
              <div>
                <img
                  src={`https://res.cloudinary.com/dps0lnavi/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1607543487/${this.state.img4}.jpg`}
                  alt=""
                  className="detailImage"
                />
              </div>
              <div>
                <img
                  src={`https://res.cloudinary.com/dps0lnavi/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1607543487/${this.state.img5}.jpg`}
                  alt=""
                  className="detailImage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withCartContext(DetailCard);
