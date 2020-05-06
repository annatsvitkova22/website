import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

const Soundcloud = ({ block, className = '' }) => {
  return <ReactPlayer url={block.attributes.url} className={className} />;
};

Soundcloud.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Soundcloud;
