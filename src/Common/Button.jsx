import React from "react";
import "./Button.css";
const Button = ({ name, ...props }) => {
  return (
    <button type="button" className={"btn btn-" + name} {...props}>
      {name}
    </button>
  );
};
export default Button;
