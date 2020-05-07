import React from 'react';
import PropTypes from 'prop-types';

const CodeBlock = ({ block, className = '' }) => {
  return (
    <div
      className={`${className} ${block.attributes.className}`}
      dangerouslySetInnerHTML={{ __html: block.saveContent }}
    />
  );
};

CodeBlock.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default CodeBlock;
