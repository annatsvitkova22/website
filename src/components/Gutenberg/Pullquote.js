import React from 'react';
import PropTypes from 'prop-types';

const Pullquote = ({ block }) => {
  return <div dangerouslySetInnerHTML={{ __html: block.originalContent }} />;
};

Pullquote.propTypes = {
  block: PropTypes.any,
};

export default Pullquote;
