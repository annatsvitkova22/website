import React from 'react';
import PropTypes from 'prop-types';

import Icons from '~/components/Icons';

const ShareItems = ({ className = '' }) => {
  return (
    <div className={className}>
      <a href={'https://facebook.com'}>
        <Icons icon={'facebook'} />
      </a>
      <a href={'https://telegram.com'}>
        <Icons icon={'telegram'} />
      </a>
      <a href={''}>
        <Icons icon={'share'} />
      </a>
    </div>
  );
};

ShareItems.propTypes = {
  className: PropTypes.string,
};

export default ShareItems;
