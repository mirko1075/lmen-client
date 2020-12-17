import React from "react";

function ReviewCard(props) {
  const review = props.review;
  console.log("updateReviews from ReviewCard :>> ", props);
  return (
    <div className="review">
      <h4>{review.length} Reviews</h4>
      {review.length ? (
        review.map((review) => {
          return (
            <div key={review._id} className="reviewItem">
              <div>
                <h4>Title: {review.title}</h4>
              </div>
              <div>
                <p>
                  Message:
                  {review.message} <br />
                  {/* {review.userId.email} -
                  {review.updated_at} */}
                </p>
              </div>
              <div>{review.description}</div>
              {review.userId == props.userId ? (
                <div>
                  <button onClick={() => props.deleteReview(review._id)}>
                    Delete
                  </button>
                </div>
              ) : null}
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
