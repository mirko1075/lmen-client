import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";

class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    // Call funciton coming from AuthProvider ( via withAuth )
    this.props.login(email, password);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="loginDiv">
        <div className="authForm">
          <div>
            <p>Already have account?</p>
          </div>
          <div>
            <h1>Login</h1>
          </div>

          <form onSubmit={this.handleFormSubmit}>
            <div>
              <label>email:</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label>Password:</label>
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
          </form>
        </div>
        <div className="authForm">
          <p>Already don't have an account?</p>
          <h1>Sign Up</h1>

          <form onSubmit={this.handleFormSubmit}>
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
              <input type="submit" value="Signup" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
