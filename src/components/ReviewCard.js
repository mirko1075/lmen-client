import React from "react";
import closingWindowImg from "../images/closewindow.png";
function ReviewCard(props) {
  const review = props.review;
  console.log("updateReviews from ReviewCard :>> ", props);
  return (
    <div className="review">
      <h4>{review.length} Reviews</h4>
      <hr />
      {
        review.length
          ? review.map((review) => {
              return (
                <div key={review._id} className="reviewItem">
                  <div className="reviewTitle">
                    <h4>Title: {review.title}</h4>
                    {review.userId == props.userId ? (
                      <div>
                        <img
                          src={closingWindowImg}
                          onClick={() => props.deleteReview(review._id)}
                          alt=""
                          className="closingIcon"
                        />
                      </div>
                    ) : null}
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
                </div>
              );
            })
          : null
        /*  {(
        <div>No reviews</div>
      )} */
      }
    </div>
  );
}

export default ReviewCard;
