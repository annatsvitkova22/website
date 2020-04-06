import React from 'react';
import PropTypes from 'prop-types';

const Separator = ({ block }) => {
  return (
    <div
      className={block.attributes.className}
      dangerouslySetInnerHTML={{ __html: block.saveContent }}
    />
  );
};

Separator.propTypes = {
  block: PropTypes.any,
};

export default Separator;
