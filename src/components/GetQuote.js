import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import classes from "./GetQuote.module.css";

const GetQuote = (props) => {
  const [price, setPrice] = useState("0");
  const [isPriceIncreasing, setIsPriceIncreasing] = useState(true);

  //For tracking last-recorded price
  const increaseRef = useRef();

  //callback for preventing excessive re-render,
  //and to provide initial price quote (without setInterval delay)
  const fetchQuote = useCallback(async () => {
    const res = await axios.get(
      `https://data.messari.io/api/v1/assets/${props.crypto}/metrics`
    );
    const priceObject = {
      timestamp: res.data.status.timestamp,
      price: `$${res.data.data.market_data.price_usd.toFixed(2)}`,
      key: res.data.status.timestamp,
      percentChangeLast24Hours:
        res.data.data.market_data.percent_change_usd_last_24_hours,
    };
    setPrice(priceObject);
  }, [props.crypto]);

  // Retrieve quote at regular interval and on change
  useEffect(() => {
    fetchQuote();
    const interval = setInterval(() => {
      console.log("in set interval");
      fetchQuote();
    }, 5000);

    return () => clearInterval(interval);
  }, [props.crypto, fetchQuote]);

  // Check if price increased or decreased on change
  useEffect(() => {
    if (price.percentChangeLast24Hours > increaseRef.current) {
      setIsPriceIncreasing(true);
    } else if (price.percentChangeLast24Hours < increaseRef.current) {
      setIsPriceIncreasing(false);
    }
    increaseRef.current = price.percentChangeLast24Hours;
  }, [price.percentChangeLast24Hours]);

  // Rendering logic helpers
  const increasingQuote = <h1 className={classes.green}>{price.price}</h1>;
  const decreasingQuote = <h1 className={classes.red}>{price.price}</h1>;

  const quote = isPriceIncreasing ? increasingQuote : decreasingQuote;

  return <React.Fragment>{quote}</React.Fragment>;
};

export default GetQuote;
