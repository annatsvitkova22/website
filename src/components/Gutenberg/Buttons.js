import React from 'react';
import PropTypes from 'prop-types';
import Button from '~/components/Gutenberg/Button';

const Buttons = ({ block, className = '' }) => {
  return (
    <div className={`${className} gutenberg__buttons`}>
      {block.innerBlocks.map((button) => (
        <Button block={button} />
      ))}
    </div>
  );
};

Buttons.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Buttons;
