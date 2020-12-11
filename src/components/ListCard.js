import React from "react";
import { Link } from "react-router-dom";
export default function ListCard(props) {
  const product = props.product;
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
            class="productListImg"
          />
        </div>
        <div>
          <h2 className="productListItem">{product.name}</h2>
          <p>{product.price} € -- BUY</p>
        </div>
      </Link>
    </div>
  );
}
