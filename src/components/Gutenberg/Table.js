import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ block }) => {
  const style = {
    textAlign: block.textAlign,
  };
  return (
    <div
      className={block.attributes.className}
      style={style}
      dangerouslySetInnerHTML={{ __html: block.saveContent }}
    />
  );
};

Table.propTypes = {
  block: PropTypes.any,
};

export default Table;
