import React from 'react';

import Icons from '~/components/Icons';
import LikeButton from '~/components/LikeButton';

const Share = ({ post }) => {
  const changeVisibility = () => {
    console.log('share');
  };

  return (
    <aside className={'share'}>
      <div className={'share-wrapper'}>
        <LikeButton post={post} />
      </div>
      <div className={'share-wrapper'}>
        <button onClick={changeVisibility} className={'share-button'}>
          <Icons icon={'share'} />
        </button>
      </div>
    </aside>
  );
};

export default Share;
