import React from "react";
import AddReview from "./AddReview";
function ReviewCard(props) {
  const review = props.review;
  const showAddReview = props.showAddReview;
  // console.log("showAddReview :>> ", showAddReview);
  // console.log("props.show :>> ", props.show);
  // console.log("updateReviews from ReviewCard :>> ", props);
  return (
    <div>
      {review.length ? (
        review.map((review) => {
          return (
            <div key={review._id}>
              <h3>
                {review.title} <br />
                {review.message} <br /> {review.userId.email} -
                {review.updated_at}
              </h3>
              <p>{review.description}</p>
            </div>
          );
        })
      ) : (
        <div>No reviews</div>
      )}
    </div>
  );
}

export default ReviewCard;
