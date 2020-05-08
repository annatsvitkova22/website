import React from 'react';
import PropTypes from 'prop-types';

const Instagram = ({ block, className = '' }) => {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: block.saveContent }}
    />
  );
};

Instagram.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Instagram;
