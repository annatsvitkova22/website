import React from 'react';
import PropTypes from 'prop-types';

import Content from '~/components/Content';

const Cover = ({ block, className = '' }) => {
  const backgroundStyles = {
    backgroundImage: `url(${block.attributes.url})`,
    width: '500px',
    height: '500px',
  };
  const coverContainer = {
    backgroundColor: `${block.attributes.overlayColor}`,
    width: '100%',
    height: '100%',
    opacity: `${block.attributes.dimRatio}`,
  };

  return (
    <div style={backgroundStyles} className={`gutenberg__cover ${className}`}>
      <div style={coverContainer}>
        <Content content={block.innerBlocks} />
      </div>
    </div>
  );
};

Cover.propTypes = {
  block: PropTypes.any,
};

export default Cover;
