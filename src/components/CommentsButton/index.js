import React from 'react';
import PropTypes from 'prop-types';
import { useStateLink } from '@hookstate/core';

import CommentsPopUp from '~/components/CommentsPopUp';
import Icons from '~/components/Icons';
import { PostStore } from '~/stores/Post';

const CommentsButton = ({ className, comments }) => {
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
        <span>Коментарі</span>
        {comments && <span>( {comments.pageInfo.total})</span>}
      </button>
      <CommentsPopUp />
    </>
  );
};

CommentsButton.propTypes = {
  className: PropTypes.string,
  comments: PropTypes.any,
};

export default CommentsButton;
