import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
// import countryService from "./../lib/countries-service";

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
    countriesCities: [],
    loginErr: "",
    signupErr: "",
  };
  // componentDidMount() {
  //   const countriesCities = [];
  //   const pr = countryService
  //     .getCountries()
  //     .then((countriesFound) => {
  //       // let countries = Object.keys(countriesFound);
  //       console.log("countries :>> ", countriesFound);
  //       //   countries.forEach((country) => {
  //       //     console.log("country :>> ", country);
  //       //     const pr = countryService
  //       //       .getCities(country)
  //       //       .then((cities) => {
  //       //         let countriesCitiesObj = { country, cities };
  //       //         countriesCities.push(countriesCitiesObj);
  //       //       })
  //       //       .catch((err) => {
  //       //         console.log("Error loading cities :>> ", err);
  //       //       });
  //       //     return pr;
  //       //   });
  //       //   this.setState({ countriesCities });
  //       //   console.log(
  //       //     "this.state.countriesCities :>> ",
  //       //     this.state.countriesCities
  //       //   );
  //     })
  //     .catch((err) => {});
  //   return pr;
  // }
  handleLoginFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ loginErr: "Provide username and password" });
      return;
    }
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
      repeatpassword,
    } = this.state;
    if (!email) {
      this.setState({ signupErr: "Email field is mandatory" });
      return;
    } else if (!password || !repeatpassword) {
      this.setState({ signupErr: "Password fields are mandatory" });
      return;
    } else if (password !== repeatpassword) {
      this.setState({ signupErr: "The 2 passwords don't match" });
      return;
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
      email,
      password,
      repeatpassword,
    } = this.state;
    // console.log("this.props from Login :>> ", this.props);
    const daysArr = [];
    const monthsArr = [];
    const yearsArr = [];
    for (let i = 1; i <= 31; i++) {
      daysArr.push("" + i);
    }
    for (let i = 1; i <= 12; i++) {
      monthsArr.push("" + i);
    }
    const date = new Date();
    const year = Number(date.getFullYear());

    for (let i = 1920; i <= year; i++) {
      yearsArr.push("" + i);
    }
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
            <div id="loginErr" className="formErr">
              {this.props.messageLogin ? this.props.messageLogin : null}
              {this.state.loginErr ? this.state.loginErr : null}
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
              <label htmlFor="email">*Email:</label>
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
              <label htmlFor="password">*Password:</label>
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
              <label htmlFor="password">*Repeat password:</label>
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
              <select
                name="birthDateDay"
                id="birthDateDay"
                onChange={this.handleChange}
              >
                <option value="" key="d-0"></option>
                {daysArr.map((day) => {
                  return (
                    <option value={day} key={"d-" + day}>
                      {day}
                    </option>
                  );
                })}
              </select>
              <select
                name="birthDateMonth"
                id="birthDateMonth"
                onChange={this.handleChange}
              >
                <option value="" key="m-0"></option>
                {monthsArr.map((month) => {
                  return (
                    <option value={month} key={"m-" + month}>
                      {month}
                    </option>
                  );
                })}
              </select>
              <select
                name="birthDateYear"
                id="birthDateYear"
                onChange={this.handleChange}
              >
                <option value="" key="y-0"></option>
                {yearsArr.map((year) => {
                  return (
                    <option value={year} key={"y-" + year}>
                      {year}
                    </option>
                  );
                })}
              </select>
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
              <input type="submit" value="Signup" />
            </div>
            <div id="signupErr" className="formErr">
              {this.props.messageSignup ? this.props.messageSignup : null}
              {this.state.signupErr ? this.state.signupErr : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
