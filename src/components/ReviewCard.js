import React from "react";
import AddReview from "./AddReview";
function ReviewCard(props) {
  const review = props.review;
  const showAddReview = props.showAddReview;
  console.log("showAddReview :>> ", showAddReview);
  console.log("props.show :>> ", props.show);
  console.log("props :>> ", props);
  return (
    <div>
      {review.length ? (
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
      ) : (
        <div>No reviews</div>
      )}
      <div>
        <button onClick={showAddReview}>
          {props.show ? "Hide form" : "Add Review"}
        </button>
      </div>
      {props.show ? <AddReview /> : null}
      <br />
    </div>
  );
}

export default ReviewCard;
