import React from 'react';
import PropTypes from 'prop-types';

const MediaText = ({ block }) => {
  return <div dangerouslySetInnerHTML={{ __html: block.saveContent }} />;
};

MediaText.propTypes = {
  block: PropTypes.any,
};

export default MediaText;
