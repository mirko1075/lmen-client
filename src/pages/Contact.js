import React, { Component } from "react";
import image from "../images/Carousel/img1.jpg";
export default class Contact extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    };
  }
  render() {
    return (
      <div className="contactDiv">
        <div>
          <img src={image} alt="" className="contactImg" />
        </div>
        <div className="contactFormDiv">
          <form action="">
            <div className="">
              <label for="reg_nome" className="">
                Field of interest*
              </label>
            </div>
            <div className="">
              <select
                id="select-topic"
                name="SelectedArgument"
                className="form-control"
              >
                <option value="Order">Order</option>
                <option value="Payment">Payment</option>
                <option value="Product">Product</option>
                <option value="Promotions">Promotions</option>
                <option value="Returns and withdrawals">
                  Returns and withdrawals
                </option>
                <option value="Treatment of personal data and privacy">
                  Treatment of personal data and privacy
                </option>
                <option value="Business requests">Business requests</option>
                <option value="Requests from suppliers">
                  Requests from suppliers
                </option>
              </select>
            </div>
            <div class="row">
              <div className="">
                <label for="reg_nome" className="">
                  First name*
                </label>
              </div>
              <div className="">
                <input
                  class="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  required="True"
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div class="row">
              <div className="">
                <label for="reg_nome" className="">
                  Last name*
                </label>
              </div>
              <div className="">
                <input
                  class="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  required="True"
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div class="row">
              <div className="">
                <label for="reg_nome" className="">
                  Email*
                </label>
              </div>
              <div className="">
                <input
                  class="form-control"
                  data-val="true"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required="True"
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div class="row">
              <div className="">
                <label for="reg_nome" className="">
                  Subject*
                </label>
              </div>
              <div className="">
                <input
                  class="form-control"
                  id="Subject"
                  name="Subject"
                  placeholder="Subject"
                  required="True"
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div class="row">
              <div className="">
                <label for="reg_nome" className="">
                  Message*
                </label>
              </div>
              <div className="">
                <textarea
                  class="form-control"
                  cols="20"
                  id="Message"
                  name="Message"
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div class="row">
              <div className="">
                <span class="radio-options">
                  <span class="radio-wrapper">
                    <input
                      data-val="true"
                      id="acceptTerms"
                      name="AcceptPrivacy"
                      onChange="validatePrivacy();"
                      type="checkbox"
                      value="true"
                    />
                    <input name="AcceptPrivacy" type="hidden" value="false" />
                  </span>
                  <span>
                    {" "}
                    *Read the privacy policy on how your personal data is
                    processed
                  </span>
                </span>
              </div>
            </div>
            <div class="row">
              <div className=""></div>
            </div>
            <div class="row">
              <div className="">
                <input
                  className=""
                  value="SEND"
                  id="contactus-submit"
                  type="submit"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
