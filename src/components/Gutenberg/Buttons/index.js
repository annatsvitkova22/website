import React from 'react';
import PropTypes from 'prop-types';

import Button from '~/components/Gutenberg/Button';

const Buttons = ({ block, className = '' }) => {
  return (
    <div className={`gutenberg__buttons ${className}`}>
      {block.innerBlocks.map((button, index) => (
        <Button block={button} key={index} />
      ))}
    </div>
  );
};

Buttons.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Buttons;
