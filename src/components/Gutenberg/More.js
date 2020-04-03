import React from 'react';
import PropTypes from 'prop-types';

const More = ({ block }) => {
  return <div dangerouslySetInnerHTML={{ __html: block.saveContent }} />;
};

More.propTypes = {
  block: PropTypes.any,
};

export default More;
