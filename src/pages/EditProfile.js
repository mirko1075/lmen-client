import React, { Component } from "react";
import withCartContext from "../context/withCartContext";
import { withAuth } from "./../context/auth-context";
import authService from "./../lib/auth-service";
import countriesService from "./../lib/countries-service";
import img from "../images/Carousel/img3.jpg";

class EditProfile extends Component {
  state = {
    user: {},
    countries: {},
    cities: [{}],
  };

  componentDidMount() {
    const pr = authService
      .user()
      .then((user) => {
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
        } = user;
        this.setState({
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
          currentPassword: "",
          password: "",
          repeatpassword: "",
        });

        const pr = countriesService.getCountries();
        return pr;
      })
      .then((countriesObj) => {
        let { countries } = countriesObj;
        this.setState({ countries });

        const pr = countriesService.getCities;
        return pr;
      })
      .then((citiesObj) => {
        let { cities } = citiesObj;
        this.setState({ cities });
        console.log("this.state from EditProfile Page:>> ", this.state);
      })
      .catch((err) => {
        console.log("Error retriving countries and cities", err);
      });
    return pr;
  }

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
      currentPassword,
      password,
      repeatpassword,
    } = this.state;
    console.log(
      "this.state :>> ",
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
      currentPassword,
      password,
      repeatpassword
    );
    authService
      .editProfile(
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
        currentPassword,
        password,
        repeatpassword
      )
      .then((updatedUser) => console.log("Updated profile"))
      .catch((err) => {
        console.log("Error updating profile");
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("name :>> ", name, "value", value);
    this.setState({ [name]: value });
  };

  render() {
    console.log("this.props :>> ", this.props);
    return (
      <div className="editProfileContainer">
        <div>Edit profile</div>
        <div>
          <div className="editProfileDiv">
            <div>
              <img src={img} alt="" className="editProfileImg" />
            </div>
            <div>
              <div>
                <form onSubmit={this.handleSignUpFormSubmit}>
                  <div>
                    <label htmlFor="firstName">First name</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={this.state.firstName}
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
                      value={this.state.lastName}
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
                      value={this.state.address}
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
                      value={this.state.country}
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
                      value={this.state.CP}
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
                      value={this.state.city}
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
                      value={this.state.state}
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
                      value={this.state.phoneNumber}
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
                      value={this.state.birthDateDay}
                      onChange={this.handleChange}
                    />
                    /
                    <input
                      type="text"
                      name="birthDateMonth"
                      value={this.state.birthDateMonth}
                      onChange={this.handleChange}
                    />
                    /
                    <input
                      type="text"
                      name="birthDateYear"
                      value={this.state.birthDateYear}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="gender">Gender</label>
                  </div>
                  <div>
                    Male{" "}
                    {this.state.gender === "male" ? (
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        checked
                        onChange={this.handleChange}
                      />
                    ) : (
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        onChange={this.handleChange}
                      />
                    )}{" "}
                    - Female{" "}
                    {this.state.gender === "female" ? (
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        checked
                        onChange={this.handleChange}
                      />
                    ) : (
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        onChange={this.handleChange}
                      />
                    )}
                    - Other{" "}
                    {this.state.gender === "other" ? (
                      <input
                        type="radio"
                        id="other"
                        name="gender"
                        value="other"
                        checked
                        onChange={this.handleChange}
                      />
                    ) : (
                      <input
                        type="radio"
                        id="other"
                        name="gender"
                        value="other"
                        onChange={this.handleChange}
                      />
                    )}
                  </div>
                  <div>
                    <label htmlFor="email">Email:</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Current password:</label>
                  </div>
                  <div>
                    <input
                      type="password"
                      name="currentPassword"
                      value={this.state.currentPassword}
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
                      value={this.state.password}
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
                      value={this.state.repeatpassword}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <input type="submit" value="Save data" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(withCartContext(EditProfile));
