import React from "react";
import { Link } from "react-router-dom";
export default function ListCard(props) {
  const product = props.product;
  return (
    <div className="listCard">
      <Link to={"/productDetail/" + product._id}>
        <h3 className="productListItem">{product.name}</h3>

        <img
          src={
            "https://res.cloudinary.com/dps0lnavi/image/upload/c_thumb,w_200,g_face/v1607543765/" +
            product.image.toLowerCase() +
            "_1.jpg"
          }
          alt=""
        />
        <p>
          {product.price} € -- <Link>BUY</Link>
        </p>
      </Link>
    </div>
  );
}
