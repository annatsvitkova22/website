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

  const imgStyles = {
    maxWidth: `${block.attributes.mediaWidth}%`,
    height: '100%',
    objectFit: 'cover',
  };

  return (
    <div className={`${className} gutenberg__mtext`}>
      <img
        src={block.attributes.mediaUrl}
        alt=""
        style={imgStyles}
        className={imgCls}
      />
      <div className="mtext__content">
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
