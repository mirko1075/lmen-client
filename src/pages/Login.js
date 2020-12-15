import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";

class Login extends Component {
  state = {
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    CP: "",
    city: "",
    state: "",
    phoneNumber: "",
    gender: "",
    birthDateDay: "",
    birthDateMonth: "",
    birthDateYear: "",
    email: "",
    password: "",
    repeatpassword: "",
  };

  handleLoginFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    // Call funciton coming from AuthProvider ( via withAuth )
    this.props.login(email, password);
  };

  handleSignUpFormSubmit = (event) => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      address,
      country,
      CP,
      city,
      state,
      phoneNumber,
      gender,
      birthDateDay,
      birthDateMonth,
      birthDateYear,
      email,
      password,
    } = this.state;
    if (!email) {
    }
    this.props.signup(
      firstName,
      lastName,
      address,
      country,
      CP,
      city,
      state,
      phoneNumber,
      gender,
      birthDateDay,
      birthDateMonth,
      birthDateYear,
      email,
      password
    );
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("name :>> ", name, "value", value);
    this.setState({ [name]: value });
  };

  render() {
    const {
      firstName,
      lastName,
      address,
      country,
      CP,
      city,
      state,
      phoneNumber,
      birthDateDay,
      birthDateMonth,
      birthDateYear,
      email,
      password,
      repeatpassword,
    } = this.state;
    // console.log("this.props from Login :>> ", this.props);
    return (
      <div className="loginDiv">
        <div className="authForm">
          <div>
            <p>Already have account?</p>
          </div>
          <div>
            <h1>Login</h1>
          </div>
          <br />
          <form onSubmit={this.handleLoginFormSubmit}>
            <div>
              <label htmlFor="email">Email</label>
            </div>
            <div>
              <input
                type="text"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <input type="submit" value="Login" />
            </div>
            <div>
              {this.props.messageLogin ? this.props.messageLogin : null}
            </div>
          </form>
        </div>
        <div className="authForm">
          <div>Already don't have an account?</div>
          <div>
            <h1>Sign Up</h1>
          </div>
          <form onSubmit={this.handleSignUpFormSubmit}>
            <div>
              <label htmlFor="password">First name</label>
            </div>
            <div>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last name</label>
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
            </div>
            <div>
              <input
                type="text"
                name="address"
                value={address}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label htmlFor="country">Country</label>
            </div>
            <div>
              <input
                type="text"
                name="country"
                value={country}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="CP">Zip code</label>
            </div>
            <div>
              <input
                type="text"
                name="CP"
                value={CP}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
            </div>
            <div>
              <input
                type="text"
                name="city"
                value={city}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="state">State / state</label>
            </div>
            <div>
              <input
                type="text"
                name="state"
                value={state}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone number</label>
            </div>
            <div>
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="birthDateDay">Birth date</label>
            </div>
            <div>
              <input
                type="text"
                name="birthDateDay"
                value={birthDateDay}
                onChange={this.handleChange}
              />
              /
              <input
                type="text"
                name="birthDateMonth"
                value={birthDateMonth}
                onChange={this.handleChange}
              />
              /
              <input
                type="text"
                name="birthDateYear"
                value={birthDateYear}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
            </div>
            <div>
              {/* Male <input type="radio" name="gender" value="male" id="male" { gender === "male" ? "selected" : null} /> - Female
              <input type="radio" name="gender" id="female" value="female" { gender === "female" ? "selected" : null} /> - Other
              <input type="radio" name="gender" id="other" value="other" { gender === "other" ? "selected" : null} /> */}
              Male{" "}
              <input
                type="radio"
                name="gender"
                value="male"
                id="male"
                onChange={this.handleChange}
              />{" "}
              - Female
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                onChange={this.handleChange}
              />{" "}
              - Other
              <input
                type="radio"
                name="gender"
                id="other"
                value="other"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
            </div>
            <div>
              <input
                type="text"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Repeat password:</label>
            </div>
            <div>
              <input
                type="password"
                name="repeatpassword"
                value={repeatpassword}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input type="submit" value="Signup" />
            </div>
            <div>
              {this.props.messageSignup ? this.props.messageSignup : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
