import React from 'react';
import PropTypes from 'prop-types';

const Twitter = ({ block, className = '' }) => {
  return (
    <div className={`${className} gutenberg__facebook`}>
      <blockquote className="twitter-tweet" data-lang="en">
        <p lang="en" dir="ltr">
          just setting up my twttr
        </p>
        &mdash; Jack (@jack){' '}
        <a href="https://twitter.com/jack/status/20">March 21, 2006</a>
      </blockquote>
      >
    </div>
  );
};

Twitter.propTypes = {
  block: PropTypes.object,
  className: PropTypes.string,
};

export default Twitter;
