import React from 'react';
import PropTypes from 'prop-types';

const Archives = ({ block }) => {
  return <div dangerouslySetInnerHTML={{ __html: block.renderedContent }} />;
};

Archives.propTypes = {
  block: PropTypes.any,
};

export default Archives;
