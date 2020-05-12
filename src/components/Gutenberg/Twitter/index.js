import React from 'react';
import PropTypes from 'prop-types';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const Twitter = ({ block, className = '' }) => {
  const twitterUrl = block.attributes.url
    .replace(/[a-zA-Z]./gm, '')
    .replace(/\//gm, '')
    .replace(/\?\d*/gm, '');

  return (
    <div className={`gutenberg__twitter ${className}`}>
      <TwitterTweetEmbed tweetId={twitterUrl} />
    </div>
  );
};

Twitter.propTypes = {
  block: PropTypes.object,
  className: PropTypes.string,
};

export default Twitter;
