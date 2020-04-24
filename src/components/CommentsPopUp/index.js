import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStateLink } from '@hookstate/core';

import ShareItems from '~/components/ShareItems';
import CommentsItem from '~/components/CommentsPopUp/CommentsItem';
import Icons from '~/components/Icons';
import { PostStore } from '~/stores/Post';

const CommentsPopUp = () => {
  const [text, setText] = useState('');
  const state = useStateLink(PostStore);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleClose = () => {
    state.set((visibility) => {
      return {
        ...visibility,
        isVisible: false,
      };
    });
    document.querySelector('body').classList.remove('isB-MenuOpen');
  };

  const handleSubmitComment = () => {
    setText('');
    handleClose();
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
              <div className={'comments-pp__post'}>
                <textarea
                  className={'comments-pp__input'}
                  placeholder={'Ваш коментар'}
                  onChange={handleInputChange}
                  value={text}
                />
                <button
                  className={'comments-pp__btn'}
                  onClick={handleSubmitComment}
                >
                  Залишити коментар
                </button>
              </div>
              <CommentsItem />
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
