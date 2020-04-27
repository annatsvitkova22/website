import React, { useState } from 'react';
import * as classnames from 'classnames';
import gql from 'graphql-tag';
import apolloClient from '~/lib/ApolloClient';

const ADD_COMMENT = gql`
  mutation($author: String, $commentOn: Int, $content: String) {
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

const CommentForm = ({
  post,
  comment,
  className,
  label = 'Повідомлення',
  onSent = () => {},
}) => {
  const type = post.__typename.toLowerCase();

  const id = post[`${type}Id`];
  const [form, setForm] = useState({
    name: '',
    message: '',
  });

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmitComment = async () => {
    const { name, message } = form;
    if (!name || !message) return;
    const content = comment
      ? `<blockquote>
      <div className="comments-pp__author">
        <div className="comments-pp__name">
          <span>${comment.author.name}</span>
          <span>${comment.date}</span>
        </div>
      </div>
      <div className="comments-pp__text">${comment.content}</div>
    </blockquote><div>${message}</div>`
      : message;

    const variables = {
      author: name,
      content,
      commentOn: id,
    };

    const response = await apolloClient.query({
      query: ADD_COMMENT,
      variables,
    });
    if (response.data.createComment.success) {
      setForm({
        name: '',
        message: '',
      });
      // TODO: make it
      console.log('load newly added comments');
      onSent();
    }
  };

  return (
    <div className={classnames('comments-pp__post', className)}>
      <input
        className={'comments-pp__input pp__input-name'}
        type={'text'}
        placeholder={`Ім'я`}
        onChange={handleInputChange}
        value={form.name}
        name={'name'}
        autoFocus
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
      <button className={'comments-pp__btn'} onClick={handleSubmitComment}>
        {label}
      </button>
    </div>
  );
};

export default CommentForm;
