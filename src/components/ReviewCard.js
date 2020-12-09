import React from "react";

export default function ReviewCard(props) {
  const review = props.review;
  return (
    review &&
    review.map((review) => {
      return (
        <div>
          <h3>
            {review && review.title} - {review && review.updated_at} -{" "}
            {review && review.reviewUser.email}
          </h3>
          <p>{review && review.description}</p>
        </div>
      );
    })
  );
}
