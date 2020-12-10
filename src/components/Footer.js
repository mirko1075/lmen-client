import React from "react";
import { Link } from "react-router-dom";

import MenuCategories from "./../components/MenuCategories";

export default function Footer() {
  return (
    <div className="footer">
      <div className="FooterDivs">
        <h4>Buy online</h4>
        <MenuCategories />
      </div>
      <div className="FooterDivs">
        <h4>Customer care</h4>
        <div>
          <Link to="#">Returns and refound</Link>
          <Link to="#">Delivery</Link>
          <Link to="#">Security and payments</Link>
          <Link to="#">F.A.Q</Link>
          <Link to="#">Contact us</Link>
        </div>
      </div>
      <div className="FooterDivs">
        <h4>Follow us on</h4>
        <div className="socials">
          {/* <!-- ShareThis BEGIN --> */}
          <div className="sharethis-inline-follow-buttons"></div>
          {/* <!-- ShareThis END --> */}
        </div>
      </div>
    </div>
  );
}
