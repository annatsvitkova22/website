import React from 'react';

import LikeButton from '~/components/LikeButton';
import Share from '~/components/Share';

const ActionsSidebar = ({ post, postId }) => {

  return (
    <aside className={'share'}>
      <div className={'share-wrapper'}>
        <LikeButton post={post} postId={postId} />
      </div>
      <div className={'share-wrapper'}>
        <Share type={'compact'} />
      </div>
    </aside>
  );
};

export default ActionsSidebar;
