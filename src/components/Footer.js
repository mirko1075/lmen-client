import React from "react";
import { Link } from "react-router-dom";
import igIcon from "../images/instagram_icon.png";
import fbIcon from "../images/facebook_icon.png";
export default function Footer() {
  return (
    <div className="footer">
      <div className="FooterDivs">
        <Link>Privacy policy</Link> | <Link>Cookies policy</Link> |{" "}
        <Link to="/Contact">Contact</Link>
      </div>
      <div className="FooterDivs">
        © 2020 LM&N Confeccion - Brasil - All rigths reserved
      </div>
      <div className="FooterDivs">
        <div className="social">
          {/* <!-- ShareThis BEGIN --> */}
          <span className="socialText">Follow us on</span>
          {"     "}
          <a
            href="https://www.instagram.com/lm_e_n.confeccion/"
            target="_blank"
          >
            <img src={igIcon} alt="Add me on IG" className="socialIcon" />
          </a>
          {"     "}
          <a href="https://www.facebook.com/lmen.confeccion" target="_blank">
            <img src={fbIcon} alt="Add me on FB" className="socialIcon" />
          </a>
          {/* <!-- ShareThis END --> */}
        </div>
      </div>
    </div>
  );
}
