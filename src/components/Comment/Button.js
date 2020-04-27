import React from 'react';
import PropTypes from 'prop-types';
import { useStateLink } from '@hookstate/core';

import CommentPopup from '~/components/Comment/Popup';
import Icons from '~/components/Icons';
import PostStore from '~/stores/Post';

const CommentButton = ({ post }) => {
  const { commentCount } = post;
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
        <span>Коментарі ({commentCount ? commentCount : '0'})</span>
      </button>
      <CommentPopup post={post} />
    </>
  );
};

CommentButton.propTypes = {
  className: PropTypes.string,
};

export default CommentButton;
