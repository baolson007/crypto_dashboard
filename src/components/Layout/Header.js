import React from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header>
      <h1>{props.crypto} Dashboard</h1>
    </header>
  );
};

export default Header;
