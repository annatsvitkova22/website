import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

const Soundcloud = ({ block }) => {
  return <ReactPlayer url={block.attributes.url} />;
};

Soundcloud.propTypes = {
  block: PropTypes.any,
};

export default Soundcloud;
