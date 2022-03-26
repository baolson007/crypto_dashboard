import React from "react";
import classes from "./Dropdown.module.css";

const Dropdown = (props) => {
  return (
    <select onChange={props.dropdownHandler}>
      <option>Ethereum</option>
      <option>Bitcoin</option>
    </select>
  );
};

export default Dropdown;
