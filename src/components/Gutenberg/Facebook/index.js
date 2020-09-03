import React from 'react';
import PropTypes from 'prop-types';
import { FacebookProvider, EmbeddedPost } from 'react-facebook';

const Facebook = ({ block, className = '' }) => {
  return (
    <div className={`gutenberg__facebook ${className}`}>
      <FacebookProvider appId="595420217740360">
        <EmbeddedPost href={block.attributes.url} />
      </FacebookProvider>
    </div>
  );
};

Facebook.propTypes = {
  block: PropTypes.object,
  className: PropTypes.string,
};

export default Facebook;
