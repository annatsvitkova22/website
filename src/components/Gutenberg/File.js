import React from 'react';
import PropTypes from 'prop-types';

const File = ({ block }) => {
  if (block.attributes) {
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
      </a>
    );
  }
  return (
    <a
      href="#"
      download
      style={{ display: 'flex', justifyContent: 'flex-end' }}
    >
      Download
    </a>
  );
};

export default File;

File.propTypes = {
  block: PropTypes.any,
};
