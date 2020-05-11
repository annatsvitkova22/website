import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ block, className = '' }) => {
  const style = {
    textAlign: block.textAlign,
  };
  return (
    <div
      className={`${className} ${block.attributes.className} gutenberg__table`}
      style={style}
      dangerouslySetInnerHTML={{ __html: block.saveContent }}
    />
  );
};

Table.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Table;
