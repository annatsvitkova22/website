import React from 'react';
import PropTypes from 'prop-types';
import { useStateLink } from '@hookstate/core';
import { FacebookProvider, CommentsCount } from 'react-facebook';

import CommentPopup from '~/components/Comment/Popup';
import Icons from '~/components/Icons';
import PostStore from '~/stores/Post';

const CommentButton = ({ post, postId }) => {
  const state = useStateLink(PostStore);

  const changeVisibility = () => {
    state.set((visibility) => {
      return {
        ...visibility,
        isVisible: true,
      };
    });
    state.get().isVisible
      ? document.querySelector('body').classList.add('isB-MenuOpen')
      : document.querySelector('body').classList.remove('isB-MenuOpen');
  };

  return (
    <>
      <button className={`comments-button`} onClick={changeVisibility}>
        <Icons icon={'comment'} />
        <span className={'post-comments-count'}>
          Коментарі (
          {typeof window !== 'undefined' && (
            <FacebookProvider appId="595420217740360" language={'uk_UA'}>
              <CommentsCount href={window.location.href} />
            </FacebookProvider>
          )}
          )
        </span>
      </button>
      <CommentPopup post={post} postId={postId} />
    </>
  );
};

CommentButton.propTypes = {
  className: PropTypes.string,
};

export default CommentButton;
