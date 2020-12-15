import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="FooterDivs">
        <Link>Privacy policy</Link> | <Link>Cookies policy</Link> |{" "}
        <Link>Contact</Link>
      </div>
      <div className="FooterDivs">
        © 2020 LM&N Confeccion - Brasil - All rigths reserved
      </div>
      <div className="FooterDivs">
        <h4>Follow us on</h4>
        <div class="a2a_kit a2a_kit_size_32 a2a_default_style a2a_follow">
          {/* <!-- ShareThis BEGIN --> */}
          <Link class="a2a_button_facebook" data-a2a-follow="AddToAny">
            JJJJ
          </Link>
          {/* <!-- ShareThis END --> */}
        </div>
      </div>
    </div>
  );
}
