import React, { Component } from "react";
import apiService from "./../lib/api-service";
///// NOT USED
class AddReview extends Component {
  state = {
    title: "",
    message: "",
    rate: "",
    product: {},
  };
  componentDidMount() {
    const product = this.props.product;
    this.setState({ product });
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("name :>> ", name, "value", value);
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const updateReviews = this.state.review;
    const { product, title, message, rate } = this.state;

    const pr = apiService
      .postReview(product._id, title, message, rate)
      .then((review) => {
        console.log("Review created :>> ", review);
        updateReviews.push(review);
        this.setState({ review: updateReviews });
        return pr;
      })
      .catch((err) => {});
    this.props.updateReviews(this.state.product._id);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="reviewBlockItems">
            <label htmlFor="title">Title</label>
          </div>
          <div className="reviewBlockItems">
            <input
              className="reviewInput"
              type="text"
              name="title"
              id="title"
              onChange={this.handleChange}
            />
          </div>
          <div className="reviewBlockItems">
            <label htmlFor="message">Message</label>
          </div>
          <div className="reviewBlockItems">
            <textarea
              className=""
              cols="20"
              id="message"
              name="message"
              rows="4"
              onChange={this.handleChange}
              value={this.state.message}
            />
          </div>
          <br />
          <br />
          <div className="reviewBlockItems">
            <label htmlFor="rate">rate</label>
          </div>
          <div className="reviewBlockItems">
            <input
              className="reviewInput rateInput"
              type="number"
              name="rate"
              min="1"
              max="5"
              id="rate"
              onChange={this.handleChange}
            />
          </div>
          <div className="reviewBlockItems">
            <input type="submit" value="Add it" />
          </div>
        </form>
      </div>
    );
  }
}

export default AddReview;
