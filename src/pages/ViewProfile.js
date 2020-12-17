import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import authService from "./../lib/auth-service";
import { Link } from "react-router-dom";
import img from "./../images/Carousel/img2.jpg";
class ViewProfile extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    const pr = authService
      .user()
      .then((user) => {
        console.log("user :>> ", user);
        this.setState({ user });
        console.log("this.state :>> ", this.state);
        return pr;
      })
      .catch((err) => {
        console.log("Error retriving user");
      });
  }
  render() {
    return (
      <div className="showProfileCont">
        <div className="viewProfileImgDiv">
          <img src={img} alt="" className="editProfileImg" />
        </div>
        <div className="viewProfileData">
          <div className="showProfile">
            <h3>User profile</h3>
            <br />
            <div className="profileItems">
              <h4>Name</h4>
              {this.state.user.firstName}
            </div>
            <div className="profileItems">
              <h4>Last name</h4>
              {this.state.user.lasttName}
            </div>
            <div className="profileItems">
              <h4>Email</h4>
              {this.state.user.email}
            </div>
            <div className="profileItems">
              <h4>Phone number</h4>
              {this.state.user.phoneNumber}
            </div>
            <div className="profileItems">
              <h4>Gender</h4>
              {this.state.user.gender}
            </div>
            <div className="profileItems">
              <h4>Birth day</h4>
              {this.state.user.birthDateDay +
                "/" +
                this.state.user.birthDateMonth +
                "/" +
                this.state.user.birthDateYear}
            </div>
            <div className="profileItems">
              <h4>Address</h4>
              {this.state.user.address}
            </div>
            <div className="profileItems">
              <h4>Country</h4>
              {this.state.user.country}
            </div>
            <div className="profileItems">
              <h4>Zip code</h4>
              {this.state.user.CP}
            </div>
            <div className="profileItems">
              <h4>City</h4>
              {this.state.user.city}
            </div>
            <div className="profileItems">
              <h4>State / Province</h4>
              {this.state.user.state}
            </div>
            <div>
              <Link to="/private/EditProfile">Edit</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(ViewProfile);
