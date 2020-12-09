import React from "react";
import { Link } from "react-router-dom";
export default function ListCard(props) {
  const product = props.product;
  return (
    <div className="listCard">
      <Link to={"/productDetail/" + product._id}>
        <h3>{product.name}</h3>
      </Link>
      <img src={"../images/" + product.image.toLowerCase() + "_1.jpg"} alt="" />
      <p>{product.description}</p>

      <p>
        {product.price} € -- <Link>BUY</Link>
      </p>
    </div>
  );
}
