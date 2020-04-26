import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStateLink } from '@hookstate/core';

import ShareItems from '~/components/ShareItems';
import CommentsItem from '~/components/CommentsPopUp/CommentsItem';
import Icons from '~/components/Icons';
import PostStore from '~/stores/Post';

const CommentsPopUp = () => {
  const [form, setForm] = useState({
    name: '',
    message: '',
  });
  const state = useStateLink(PostStore);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
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
    console.log('submit');
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
              <form className={'comments-pp__post'}>
                <input
                  className={'comments-pp__input pp__input-name'}
                  type={'text'}
                  placeholder={`Ім'я`}
                  onChange={handleInputChange}
                  value={form.name}
                  name={'name'}
                  autofocus
                  required
                />
                <textarea
                  className={'comments-pp__input pp__input-message'}
                  placeholder={'Ваш коментар'}
                  onChange={handleInputChange}
                  value={form.message}
                  name={'message'}
                  required
                />
                <button
                  className={'comments-pp__btn'}
                  onClick={handleSubmitComment}
                >
                  Повідомлення
                </button>
              </form>
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
