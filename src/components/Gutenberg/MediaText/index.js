import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Content from '~/components/Content';

const MediaText = ({ block, className }) => {
  const imgCls = classNames({
    'mtext-img': true,
    'mtext-img--right': block.attributes.mediaPosition === 'right',
    'mtext-img--left': block.attributes.mediaPosition === 'left',
  });
  const difWidth = 100 - Number(block.attributes.mediaWidth);
  const imgStyles = {
    maxWidth: `${block.attributes.mediaWidth}%`,
  };
  const contentStyles = {
    width: `${difWidth}%`,
    backgroundColor: `$${block.attributes.backgroundColor}`,
  };

  return (
    <div className={`gutenberg__mtext ${className}`}>
      <div className={imgCls} style={imgStyles}>
        <img src={block.attributes.mediaUrl} alt="media-text-image" />
      </div>

      <div className="mtext__content" style={contentStyles}>
        <Content content={block.innerBlocks} />
      </div>
    </div>
  );
};

MediaText.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default MediaText;
