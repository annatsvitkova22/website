import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import ShareItems from '~/components/ShareItems';
import CommentsItem from '~/components/CommentsPopUp/CommentsItem';
import Icons from '~/components/Icons';

const CommentsPopUp = ({ isVisible, handleClose }) => {
  const [text, setText] = useState('');

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmitComment = () => {
    clearFields();
  };

  const clearFields = () => {
    setText('');
  };

  return (
    <>
      {isVisible && (
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
