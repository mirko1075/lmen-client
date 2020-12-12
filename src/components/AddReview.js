import React, { Component } from "react";
import apiService from "./../lib/api-service";
export default class AddReview extends Component {
  state = {
    title: "",
    message: "",
    rating: "",
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("name :>> ", name, "value", value);
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const pr = apiService.
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
            <label htmlFor="rating">Rating</label>
          </div>
          <div>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              id="rating"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input type="submit" value="Signup" />
          </div>
        </form>
      </div>
    );
  }
}
