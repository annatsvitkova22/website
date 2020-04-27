import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStateLink } from '@hookstate/core';
import { useMutation } from '@apollo/react-hooks';

import ShareItems from '~/components/ShareItems';
import CommentsItem from '~/components/CommentsPopUp/CommentsItem';
import Icons from '~/components/Icons';
import PostStore from '~/stores/Post';
import gql from 'graphql-tag';

const ADD_COMMENT = gql`
  mutation(
    $author: String
    $commentOn: Int
    $content: String
  ) {
    createComment(
      input: {
        clientMutationId: "CreateComment"
        commentOn: $commentOn
        content: $content
        author: $author
      }
    ) {
      success
    }
  }
`;

const CommentsPopUp = ({ post }) => {
  const [addComment, { data }] = useMutation(ADD_COMMENT);
  const type = post.__typename.toLowerCase();

  const id = post[`${type}Id`];
  const [form, setForm] = useState({
    name: '',
    message: '',
  });
  const state = useStateLink(PostStore);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
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
    const { name, message } = form;
    if (!name || !message) return;
    const variables = {
      author: name,
      content: message,
      commentOn: id,
    };

    // return console.log(variables);
    addComment({ variables });
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
