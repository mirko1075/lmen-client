import React from "react";
import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <div class="mainbox">
      <div class="err">4</div>
      <div class="err3">0</div>
      <div class="err2">4</div>
      <div class="msg">
        Maybe this page moved? Got deleted?
        <br />
        <br />
        <br />
        <p>
          Let's go <Link to="/">home</Link> and try from there.
        </p>
      </div>
    </div>
  );
}
