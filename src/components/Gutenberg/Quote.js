import React from 'react';
import PropTypes from 'prop-types';

const Quote = ({ block }) => {
  const style = {
    textAlign: block.attributes.align,
  };
  return (
    <blockquote
      style={style}
      className={block.attributes.className}
      dangerouslySetInnerHTML={{ __html: block.attributes.value }}
    />
  );
};

Quote.propTypes = {
  block: PropTypes.any,
};

export default Quote;
