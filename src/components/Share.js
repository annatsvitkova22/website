import React from 'react';

import Icons from '~/components/Icons';

const Share = () => {
  const changeVisibility = () => {
    console.log('share');
  };
  const handleLike = () => {
    return console.log('like');
  };

  return (
    <div className={'share'}>
      <div className={'share-wrapper'}>
        <button onClick={changeVisibility} className={'share-button'}>
          <Icons icon={'share'} />
        </button>
      </div>
      <div className={'share-wrapper'}>
        <button onClick={handleLike} className={'like'}>
          <Icons icon={'likes'} />
        </button>
      </div>
    </div>
  );
};

export default Share;
