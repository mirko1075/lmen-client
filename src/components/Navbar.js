import React, { Component } from "react";
import profileLogo from "../images/profile.png";
import exitLogo from "../images/exit.jpg";
import { Link } from "react-router-dom";
import { withAuth } from "./../context/auth-context";

// import { withCategories } from "./../context/products-context";
class Navbar extends Component {
  render() {
    // const { user, logout, isLoggedin } = this.props;
    // console.log("changeCategory :>> ", this.props);
    return (
      <div className="header">
        <nav className="navbar">
          {this.props.isLoggedIn ? (
            <div className="homeUser">
              <div className="welcome">
                <Link to="/private/ViewProfile">
                  <img src={profileLogo} alt="" className="profileLogo" />
                </Link>
                <span>
                  {"  Welcome "}
                  {this.props.user && this.props.user.firstName}
                </span>
              </div>
              <div className="welcome">
                <Link onClick={this.props.logout} to="#">
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <ul>
                <li>
                  <Link to="/login">Login / Sign Up</Link>
                </li>
              </ul>
            </div>
          )}
          <div className="menu">
            <ul>
              <li>
                <Link to={"/Home"}>Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li className="cart">
                <Link to="/cart">
                  <ion-icon name="basket"></ion-icon>Cart
                </Link>
                <span>0</span>
              </li>
            </ul>
          </div>
        </nav>
        <div className="logoDiv">
          <img
            src={
              "https://res.cloudinary.com/dps0lnavi/image/upload/v1607598662/Logo_lmen.png"
            }
            alt=""
            className="logo"
          />
        </div>
      </div>
    );
  }
}

// export default withCategories(withAuth(Navbar));
export default withAuth(Navbar);
