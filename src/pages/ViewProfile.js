import React from "react";
import { withAuth } from "./../context/auth-context";
import { Link } from "react-router-dom";
function ViewProfile(props) {
  const user = props.user;

  return (
    <div className="showProfile">
      <h1>User profile</h1>
      <br />
      <div className="profileItems">
        <h3>Name</h3>
        {user.firstName}
      </div>
      <div className="profileItems">
        <h3>Last name</h3>
        {user.lasttName}
      </div>
      <div className="profileItems">
        <h3>Email</h3>
        {user.email}
      </div>
      <div className="profileItems">
        <h3>Phone number</h3>
        {user.phoneNumber}
      </div>
      <div className="profileItems">
        <h3>Gender</h3>
        {user.gender ? user.gender : null}
      </div>
      <div className="profileItems">
        <h3>Birth day</h3>
        {user.birthDateDay
          ? user.birthDateMonth + "/" + user.birthDateYear
          : ""}
      </div>
      <div className="profileItems">
        <h3>Address</h3>
        {user.address}
      </div>
      <div className="profileItems">
        <h3>Country</h3>
        {user.country}
      </div>
      <div className="profileItems">
        <h3>Zip code</h3>
        {user.CP}
      </div>
      <div className="profileItems">
        <h3>City</h3>
        {user.city}
      </div>
      <div className="profileItems">
        <h3>State / Province</h3>
        {user.state}
      </div>
      <Link to="/private/EditProfile">Edit</Link>
    </div>
  );
}

export default withAuth(ViewProfile);
