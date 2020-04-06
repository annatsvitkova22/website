import React from 'react';
import PropTypes from 'prop-types';

const CodeBlock = ({ block }) => {
  return (
    <div
      className={block.attributes.className}
      dangerouslySetInnerHTML={{ __html: block.saveContent }}
    />
  );
};

CodeBlock.propTypes = {
  block: PropTypes.any,
};

export default CodeBlock;
