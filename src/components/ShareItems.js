import React from 'react';

import Icons from '~/components/Icons';

const ShareItems = () => {
  return (
    <div>
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

export default ShareItems;
