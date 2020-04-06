import React from 'react';
import PropTypes from 'prop-types';

const Spacer = ({ block }) => {
  return (
    <div
      className={block.attributes.className}
      dangerouslySetInnerHTML={{ __html: block.saveContent }}
    />
  );
};

Spacer.propTypes = {
  block: PropTypes.any,
};

export default Spacer;
