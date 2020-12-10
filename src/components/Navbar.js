import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../context/auth-context";
import MenuCategories from "./../components/MenuCategories";
class Navbar extends Component {
  render() {
    // const { user, logout, isLoggedin } = this.props;
    return (
      <div className="header">
        <nav className="navbar">
          {this.props.isLoggedIn ? (
            <div>
              <Link onClick={this.props.logout} to="#">
                Logout
              </Link>{" "}
              -{" Welcome "}
              {this.props.user && this.props.user.firstName}
            </div>
          ) : (
            <div>
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </ul>
            </div>
          )}

          <ul>
            <li>
              <Link to={"/ProductList"}>Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li className="cart">
              <Link to="/cart">
                <ion-icon name="basket"></ion-icon>Cart
                <span>0</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="logoDiv">
          {" "}
          <img
            src={
              "https://res.cloudinary.com/dps0lnavi/image/upload/v1607598662/Logo_lmen.png"
            }
            alt=""
            className="logo"
          />
        </div>

        <div className="menuCategories">
          <MenuCategories />
        </div>
      </div>
    );
  }
}

export default withAuth(Navbar);
