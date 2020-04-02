import React from 'react';
import PropTypes from 'prop-types';

const File = ({ block }) => {
  const style = {
    display: 'flex',
    justifyContent: block.attributes.align,
  };
  return (
    <a
      href={block.attributes.href}
      download
      className={block.attributes.className}
      style={style}
    >
      {block.attributes.fileName}
      <button>Download</button>
    </a>
  );
};

export default File;

File.propTypes = {
  block: PropTypes.any,
};
