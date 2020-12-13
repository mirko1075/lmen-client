import React, { Component } from "react";
import apiService from "./../lib/api-service";

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
    const updateReviews = this.props.updateReviews;
    // console.log("updateReviews from AddReview:>> ", updateReviews);
    // console.log("this.state from AddReview :>> ", this.state);
    const pr = apiService.postReview(
      this.state.product._id,
      this.state.title,
      this.state.message,
      this.state.rate
    );
    this.props.updateReviews(this.state.product._id);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
          </div>
          <div>
            <input
              type="text"
              name="title"
              id="title"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="message">Message</label>
          </div>
          <div>
            <input
              type="textarea"
              cols="10"
              lines="10"
              name="message"
              id="message"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="rate">rate</label>
          </div>
          <div>
            <input
              type="number"
              name="rate"
              min="1"
              max="5"
              id="rate"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input type="submit" value="Add it" />
          </div>
        </form>
      </div>
    );
  }
}

export default AddReview;
