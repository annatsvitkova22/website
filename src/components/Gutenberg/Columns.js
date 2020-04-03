import React from 'react';
import PropTypes from 'prop-types';

const Columns = ({ block }) => {
  return <div dangerouslySetInnerHTML={{ __html: block.saveContent }} />;
};

Columns.propTypes = {
  block: PropTypes.any,
};

export default Columns;
