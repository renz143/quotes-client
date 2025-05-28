/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Store';
import { TweetQuoteButton } from './TweetQuoteButton.jsx';
import { NewQuoteButton } from './NewQuoteButton.jsx';

export function QuoteBox () {
  const [state] = useContext(Context);
  const [quote, setQuote] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    state.quote.then(
      r => {
        // The API returns an array, we take the first element
        setQuote(r[0])
        setIsLoading(false)
      }
    )
  }, [state.quote]) // Added state.quote as a dependency

  return (
    <div className="col-lg-5 d-flex flex-column bg-white p-5 rounded-3" id="quote-box">
      <div className="col-10 text-center align-self-center">
        <blockquote
          className="fs-4 lead fw-normal align-items-center td-1500"
          id="text"
          style={{ color: state.color }}
        >
          {/* Updated to use quote.quote for the content */}
          <i className="fa fa-quote-left" />  {!isLoading && quote && quote.quote }
        </blockquote>
      </div>
      <span
        className="lead fs-6 fw-normal align-self-end mb-3 td-1500"
        id="author"
        style={{ color: state.color }}
      >
        {/* Ensure quote object exists before accessing author */}
        - {!isLoading && quote && quote.author }
      </span>
      <div className="d-flex justify-content-between">
        {/* Pass the correct quote content to TweetQuoteButton */}
        <TweetQuoteButton quote={!isLoading && quote ? { content: quote.quote, author: quote.author } : null} />
        <NewQuoteButton />
      </div>
    </div>
  );
}
