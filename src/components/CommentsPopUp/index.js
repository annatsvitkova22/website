import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStateLink } from '@hookstate/core';

import ShareItems from '~/components/ShareItems';
import CommentsItem from '~/components/CommentsPopUp/CommentsItem';
import Icons from '~/components/Icons';
import PostStore from '~/stores/Post';
import CommentForm from '~/components/CommentsPopUp/Form';


const CommentsPopUp = ({ post }) => {
  const { comments } = post;
  const state = useStateLink(PostStore);

  const handleClose = () => {
    state.set((visibility) => {
      return {
        ...visibility,
        isVisible: false,
      };
    });
    document.querySelector('body').classList.remove('isB-MenuOpen');
  };

  return (
    <>
      {state.get().isVisible && (
        <div className={'comments-pp__wrapper'}>
          <div className={'comments-pp'}>
            <div className={'comments-pp__close'}>
              <button
                onClick={handleClose}
                className={'comments-pp__close-btn'}
              >
                <Icons icon={'close-comment'} />
              </button>
            </div>
            <div className="comments-pp__container">
              <div className={'comments-pp__header'}>
                <span>Коментарі</span>
                <ShareItems className={'comments-pp__socials-items'} />
              </div>
              <CommentForm post={post} />
              {comments.nodes.map((comment) => (
                <CommentsItem key={comment.commentId} comment={comment} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

CommentsPopUp.propTypes = {
  isVisible: PropTypes.bool,
};

export default CommentsPopUp;
