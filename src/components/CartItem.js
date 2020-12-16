import React from "react";
import { Link } from "react-router-dom";

const CartItem = (props) => {
  const { cartItem, cartKey } = props;
  console.log("cartItem from CartItem :>> ", cartItem);
  console.log("cartKey from CartItem :>> ", cartKey);
  const imgWidth = "150";
  const imgHeight = "150";
  const { product, amount } = cartItem;
  return (
    <div className="cartItem">
      <div className="">
        <figure className="image is-64x64">
          <img
            src={`https://res.cloudinary.com/dps0lnavi/image/upload/w_${imgWidth},h_${imgHeight},c_scale/${product.image}_1.jpg`}
            alt={product.shortDesc}
          />
        </figure>
      </div>
      <div className="">
        <b>
          {product.name} <span className="">€{product.price}</span>
        </b>
        <div>{product.shortDesc}</div>
        <small>Amount: {amount}</small>
      </div>
      <div
        className="media-right"
        onClick={() => props.removeFromCart(cartKey)}
      >
        <span className="delete is-large"></span>
      </div>
    </div>
  );
};

export default CartItem;
