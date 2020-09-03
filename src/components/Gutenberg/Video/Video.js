import React from 'react';
import PropTypes from 'prop-types';

const Video = ({ block, className = '' }) => {
  return (
    <div className={`gutenberg__video ${className}`}>
      <div dangerouslySetInnerHTML={{ __html: block.saveContent }} />
    </div>
  );
};

Video.propTypes = {
  block: PropTypes.object,
  className: PropTypes.string,
};

export default Video;
