import React from "react";

function ReviewCard(props) {
  const review = props.review;
  console.log("updateReviews from ReviewCard :>> ", props);
  return (
    <div>
      {review.length ? (
        review.map((review) => {
          return (
            <div key={review._id}>
              <div>
                <h4>{review.title}</h4>
              </div>
              <div>
                {review.message} <br /> {review.userId.email} -
                {review.updated_at}
              </div>
              <div>{review.description}</div>
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
