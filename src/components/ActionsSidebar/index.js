import React from 'react';

import LikeButton from '~/components/LikeButton';
import Share from '~/components/Share';

const ActionsSidebar = ({ post, postId }) => {
  return (
    <aside className={'share'}>
      {post.zmBrandedPublication &&
        post.zmBrandedPublication.logo &&
        post.zmBrandedPublication.logo.mediaItemUrl && (
          <div className="branded-logo">
            <img
              src={post.zmBrandedPublication.logo.mediaItemUrl}
              alt={post.zmBrandedPublication.logo.title}
            />
          </div>
        )}
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
