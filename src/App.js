import React, { useState } from "react";
import GetQuote from "./components/GetQuote";
import Header from "./components/Layout/Header";
import "./App.css";
import RedditNews from "./components/RedditNews";
import Dropdown from "./UI/Dropdown";

function App() {
  const [cryptoChoice, setCryptoChoice] = useState("Ethereum");

  const dropdownHandler = (event) => {
    setCryptoChoice(event.target.value);
  };

  return (
    <div className="App">
      <Header crypto={cryptoChoice} />
      <GetQuote crypto={cryptoChoice} />
      <Dropdown dropdownHandler={dropdownHandler} />

      <RedditNews subreddit={cryptoChoice} />
    </div>
  );
}

export default App;
