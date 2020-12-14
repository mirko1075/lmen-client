import React, { Component } from "react";
import { Link } from "react-router-dom";
import withCartContext from "../context/withCartContext";

class ListCard extends Component {
  render() {
    // console.log("props from ListCard :>> ", this.props.context.addToFavorites);
    const product = this.props.product;
    const imgWidth = "200";
    const imgHeight = "200";
    return (
      <div className="listCard">
        {" "}
        <Link to={"/productDetail/" + product._id}>
          <div>
            <img
              src={`https://res.cloudinary.com/dps0lnavi/image/upload/w_${imgWidth},h_${imgHeight},c_scale/v1607543765/${product.image.toLowerCase()}_1.jpg`}
              alt=""
              className="productListImg"
            />
          </div>
          <div>
            <h2 className="productListItem">{product.name}</h2>
            <p>{product.price} € -- BUY</p>
          </div>
        </Link>
        <div>
          {this.props.isFavorite ? (
            <button onClick={() => this.props.removeFromFavorites(product._id)}>
              ❤️
            </button>
          ) : (
            <button onClick={() => this.props.addToFavorites(product._id)}>
              🤍
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default withCartContext(ListCard);
