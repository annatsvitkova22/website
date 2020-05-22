import React from 'react';

import LikeButton from '~/components/LikeButton';
import Share from '~/components/Share';

const ActionsSidebar = ({ post }) => {

  return (
    <aside className={'share'}>
      <div className={'share-wrapper'}>
        <LikeButton post={post} />
      </div>
      <div className={'share-wrapper'}>
        <Share type={'compact'} />
      </div>
    </aside>
  );
};

export default ActionsSidebar;
