import React from "react";
import "./Button.css";

function Button(props) {
  let button;

  if (props.text === "LOGIN" || props.text === "SIGN UP") {
    button = <button className="login-btn">{props.text}</button>;
  } else if (props.text === "TRACK") {
    button = (
      <button className="track-btn" onClick={props.clickHandler}>
        {props.text}
      </button>
    );
  } else if (props.text === "ADD REVIEW") {
    const isDisabled = !props.review || props.review === "<p></p>";

    button = (
      <button
        id={isDisabled ? "disabled-review-btn" : "review-btn"}
        disabled={isDisabled}
        onClick={props.clickHandler}
      >
        {props.text}
      </button>
    );
  }

  return <>{button}</>;
}

export default Button;
