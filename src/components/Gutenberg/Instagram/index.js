import React from 'react';
import PropTypes from 'prop-types';
import InstagramEmbed from 'react-instagram-embed';

const Instagram = ({ block, className = '' }) => {
  return (
    <div className={`gutenberg__instagram ${className}`}>
      <InstagramEmbed
        url={block.attributes.url}
        maxWidth={'648px'}
        hideCaption={false}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />
    </div>
  );
};

Instagram.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Instagram;
