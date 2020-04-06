import React from 'react';
import PropTypes from 'prop-types';

const FreeForm = ({ block }) => {
  return <div dangerouslySetInnerHTML={{ __html: block.saveContent }} />;
};

FreeForm.propTypes = {
  block: PropTypes.any,
};

export default FreeForm;
