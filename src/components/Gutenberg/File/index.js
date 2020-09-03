import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const File = ({ block, className = '' }) => {
  const linkStyle = classNames({
    'button--inactive': !block.attributes.downloadButtonText,
  });
  const style = {
    justifyContent: block.attributes.align,
  };
  return (
    <div className={`gutenberg__fd ${className}`} style={{ width: '100%' }}>
      <a
        href={block.attributes.href}
        download
        className={`${block.attributes.className} ${linkStyle}`}
        style={style}
      >
        {block.attributes.fileName}
        {block.attributes.showDownloadButton && (
          <button className="wp-block-button">
            {block.attributes.downloadButtonText}
          </button>
        )}
      </a>
    </div>
  );
};

export default File;

File.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};
