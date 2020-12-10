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
          <Link>Returns and refound</Link>
          <Link>Delivery</Link>
          <Link>Security and payments</Link>
          <Link>F.A.Q</Link>
          <Link>Contact us</Link>
        </div>
      </div>
      <div className="FooterDivs">
        <h4>Follow us on</h4>
        <div className="socials">
          {/* <!-- ShareThis BEGIN --> */}
          <div class="sharethis-inline-follow-buttons"></div>
          {/* <!-- ShareThis END --> */}
        </div>
      </div>
    </div>
  );
}
