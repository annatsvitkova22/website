import React from 'react';
import PropTypes from 'prop-types';

const Quote = ({ block, className = '' }) => {
  const style = {
    textAlign: block.attributes.align,
  };
  return (
    <div className={`gutenberg__quote`}>
      <blockquote
        style={style}
        className={`${block.attributes.className} ${className}`}
        dangerouslySetInnerHTML={{ __html: block.attributes.value }}
      />
      <span className={'quote__citation'}>{block.attributes.citation}</span>
    </div>
  );
};

Quote.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Quote;
