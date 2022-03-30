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
      // `https://data.messari.io/api/v1/assets/${props.crypto}/metrics`
      `https://api.coingecko.com/api/v3/simple/price?ids=${props.crypto}&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true`
    );

    let cryptoPrice = null;
    let cryptoChange = null;
    if (props.crypto === "ethereum") {
      cryptoPrice = `$${res.data.ethereum.usd.toLocaleString()}`;
      cryptoChange = res.data.ethereum.usd_24hr_change;
    } else {
      cryptoPrice = `$${res.data.bitcoin.usd.toLocaleString()}`;
      cryptoChange = res.data.bitcoin.usd_24hr_change;
    }

    const priceObject = {
      price: cryptoPrice,
      percentChangeLast24Hours: cryptoChange,
    };
    setPrice(priceObject);
  }, [props.crypto]);

  // Retrieve quote at regular interval and on change
  useEffect(() => {
    fetchQuote();
    const interval = setInterval(() => {
      fetchQuote();
    }, 60000);

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
  const increasingQuote = <p className={classes.green}>{price.price}</p>;
  const decreasingQuote = <p className={classes.red}>{price.price}</p>;

  const quote = isPriceIncreasing ? increasingQuote : decreasingQuote;

  return (
    <React.Fragment>
      <span> Current Price: {quote}</span>
    </React.Fragment>
  );
};

export default GetQuote;
