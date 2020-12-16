import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  validateForm(event) {
    event.preventDefault();
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("name :>> ", name, "value", value);
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="contactDiv">
        <div>
          <img src={image} alt="" className="contactImg" />
        </div>
        <div className="contactContainer">
          <div className="contactInfo">
            <b>INSTA:</b>
            <a
              target="_blank"
              href="https://www.instagram.com/lm_e_n.confeccion/"
            >
              @lm_e_n.confeccion
            </a>
            <br />
            <br />
            <b>FB:</b>{" "}
            <a target="_blank" href="https://www.facebook.com/lmen.confeccion">
              @lmen.confeccion
            </a>
            <br />
            <br />
            <b>Mail:</b>{" "}
            <a target="_blank" href="mailto:lmen.confeccion@bol.com.br">
              lmen.confeccion@bol.com.br
            </a>
            <br />
            <br />
            <b>DIRECCIÓN:</b> Rua 15 de novembro, 862 centro Bonito MS Brasil
            cep:79290-000 <br />
            <br />
            <b>TEL:</b> +5567993086314 +5567993350642
          </div>
          {/* CONTACT FORM */}
          <div className="contactFormDiv">
            <form action="" onSubmit={() => this.validateForm()}>
              <div className="">
                <label for="reg_nome" className="">
                  Field of interest*
                </label>
              </div>
              <div className="">
                <select id="select-topic" name="SelectedArgument" className="">
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
              <div className="rowContactForm">
                <div className="">
                  <label for="reg_nome" className="">
                    First name*
                  </label>
                </div>
                <div className="">
                  <input
                    className=""
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    required="True"
                    type="text"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="rowContactForm">
                <div className="">
                  <label for="reg_nome" className="">
                    Last name*
                  </label>
                </div>
                <div className="">
                  <input
                    className=""
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    required="True"
                    type="text"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="rowContactForm">
                <div className="">
                  <label for="reg_nome" className="">
                    Email*
                  </label>
                </div>
                <div className="">
                  <input
                    className=""
                    id="email"
                    name="email"
                    placeholder="Email"
                    required="True"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="rowContactForm">
                <div className="">
                  <label for="reg_nome" className="">
                    Subject*
                  </label>
                </div>
                <div className="">
                  <input
                    className=""
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    required="True"
                    type="text"
                    value={this.state.subject}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="rowContactForm">
                <div className="">
                  <label for="reg_nome" className="">
                    Message*
                  </label>
                </div>
                <div className="">
                  <textarea
                    className=""
                    cols="20"
                    id="message"
                    name="message"
                    rows="4"
                    onChange={this.handleChange}
                  >
                    {this.state.message}
                  </textarea>
                </div>
              </div>
              <div className="rowContactForm">
                <div className="">
                  <span className="radio-options">
                    <span className="radio-wrapper">
                      <input
                        id="acceptTerms"
                        name="AcceptPrivacy"
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
              <div className="rowContactForm">
                <div className=""></div>
              </div>
              <div className="rowContactForm">
                <div className="">
                  <input className="" value="SEND" id="submit" type="submit" />
                </div>
              </div>
            </form>
          </div>
          {/* END OF CONTACT FORM */}
        </div>
      </div>
    );
  }
}
