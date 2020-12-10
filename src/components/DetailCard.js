import React from "react";
import ReviewCard from "../components/ReviewCard";
export default function DetailCard(props) {
  const product = props.product;
  const review = props.review;

  return (
    <div>
      <p>{product && product.name}</p>
      <p>{product && product.description}</p>
      <p>{product && product.price} €</p>
      <div>
        <img
          src={`https://res.cloudinary.com/dps0lnavi/image/upload/v1607543765/${product.image}_1.jpg`}
          alt=""
        />
      </div>
      <ReviewCard review={review} />
    </div>
  );
}
