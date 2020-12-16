import React from "react";
import { Link } from "react-router-dom";

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
        <h4>Follow us on</h4>
        <div className="">
          {/* <!-- ShareThis BEGIN --> */}
          <a href="https://www.instagram.com/lm_e_n.confeccion/">
            Follow on IG
          </a>
          {/* <!-- ShareThis END --> */}
        </div>
      </div>
    </div>
  );
}
