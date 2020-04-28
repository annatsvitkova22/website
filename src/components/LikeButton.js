import React from 'react';
import Icons from '~/components/Icons';
import * as classnames from 'classnames';

const LikeButton = ({ post, className }) => {
  const type = post.__typename.toLowerCase();

  const id = post[`${type}Id`];

  const { statisticsACF: { likes } } = post;

  const handleLike = async () => {
    console.log('set like', likes, id);
  }

  return (
    <>
      <button onClick={handleLike} className={classnames('like', className)}>
        <Icons icon={'likes'} />
      </button>
      <span>{likes ? likes : '0'}</span>
    </>
  );
};

export default LikeButton;
