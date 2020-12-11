import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
class EditProfile extends Component {
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
      gender,
      birthDateDay,
      birthDateMonth,
      birthDateYear,
      email,
      password,
      repeatpassword,
    } = this.state;
    return (
      <div>
        <div>Edit Profile</div>
        <form onSubmit={this.handleSignUpFormSubmit}>
          <div>
            <label for="password">First name</label>
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
            <label for="lastName">Last name</label>
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
            <label for="address">Address</label>
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
            <label for="country">Country</label>
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
            <label for="CP">Zip code</label>
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
            <label for="city">City</label>
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
            <label for="state">State / state</label>
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
            <label for="phoneNumber">Phone number</label>
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
            <label for="birthDateDay">Birth date</label>
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
            <label for="gender">Gender</label>
          </div>
          <div>
            {/* Male <input type="radio" name="gender" value="male" id="male" { gender === "male" ? "selected" : null} /> - Female
              <input type="radio" name="gender" id="female" value="female" { gender === "female" ? "selected" : null} /> - Other
              <input type="radio" name="gender" id="other" value="other" { gender === "other" ? "selected" : null} /> */}
            Male <input type="radio" name="gender" value="male" id="male" /> -
            Female
            <input type="radio" name="gender" id="female" value="female" /> -
            Other
            <input type="radio" name="gender" id="other" value="other" />
          </div>
          <div>
            <label for="email">Email:</label>
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
            <label for="password">Password:</label>
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
            <label for="password">Repeat password:</label>
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
        </form>
      </div>
    );
  }
}
export default withAuth(EditProfile);