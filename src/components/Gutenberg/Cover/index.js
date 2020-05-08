import React from 'react';
import PropTypes from 'prop-types';

import Content from '~/components/Content';

const Cover = ({ block, className = '' }) => {
  const coverStyles = {
    backgroundImage: `url(${block.attributes.url})`,
    height: `500px`,
  };

  const overlayStyle = {
    opacity: `${block.attributes.dimRatio / 100}`,
    backgroundColor: block.attributes.overlayColor,
  };
  return (
    <div className={`gutenberg__cover`}>
      <div className="gutenberg__cover-content" style={coverStyles}>
        <div className="content__inner">
          <Content content={block.innerBlocks} />
        </div>
        <div
          className={`gutenberg__cover-overlay has-${block.attributes.overlayColor}-background-color`}
          style={overlayStyle}
        />
      </div>
    </div>
  );
};

Cover.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Cover;
