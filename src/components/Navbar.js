import React, { Component } from "react";
import profileLogo from "../images/profile.png";
import { Link } from "react-router-dom";
import { withAuth } from "./../context/auth-context";
import withCartContext from "../context/withCartContext";

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
                <Link to="/About">About</Link>
              </li>
              <li>
                <Link to="/Contact">Contact</Link>
              </li>
              {this.props.isLoggedIn ? (
                <li className="cart">
                  <Link to="/private/cart">
                    <ion-icon name="cart"></ion-icon>Cart
                  </Link>
                  <span>{this.props.context.cartElements}</span>
                </li>
              ) : null}
            </ul>
          </div>
        </nav>
        <div className="logoDiv">
          <Link to="/">
            <img
              src={
                "https://res.cloudinary.com/dps0lnavi/image/upload/v1607793773/LMeN_LOGO_4_y4ognl.png"
              }
              alt=""
              className="logo"
            />
          </Link>
        </div>
      </div>
    );
  }
}

// export default withCategories(withAuth(Navbar));
export default withCartContext(withAuth(Navbar));
