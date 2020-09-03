import React, { useState } from 'react';
import * as classnames from 'classnames';
import gql from 'graphql-tag';

import apolloClient from '~/lib/ApolloClient';
import { updateComments } from '~/stores/SingleArticle';
import { commentsQuery } from '~/lib/GraphQL/singleContentCommon';
import FormField from '~/components/Form/Field';
import FormSubmit from '~/components/Form/Submit';

const UPDATED_POST = (id) => {
  return gql`
    query UpdatedPost {
      contentNode(id: "${id}", idType: DATABASE_ID) {
        ... on Post {
          ${commentsQuery}
        }
        ... on Blog {
          ${commentsQuery}
        }
        ... on Crowdfunding {
          ${commentsQuery}
        }
        ... on Event {
          ${commentsQuery}
        }
        ... on Opportunity {
          ${commentsQuery}
        }
        ... on Other {
          ${commentsQuery}
        }
        ... on Publication {
          ${commentsQuery}
        }
        ... on Video {
          ${commentsQuery}
        }
      }
    }
  `;
};

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
  postId,
}) => {
  const [state, setState] = useState({
    isSending: false,
    sent: false,
  });
  const [form, setForm] = useState({
    name: '',
    message: '',
  });

  const type = post.__typename.toLowerCase();

  const id = post[`${type}Id`];

  const { isSending, sent } = state;

  const handleInputChange = ({ name, value }) => {
    setForm({
      ...form,
      [name.split('-')[0]]: value,
    });
  };

  const handleSubmitComment = async () => {
    setState({
      ...state,
      isSending: true,
    });
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
    if (!response.errors && response.data.createComment.success) {
      setForm({
        name: '',
        message: '',
      });

      const updatedPost = await apolloClient.query({
        query: UPDATED_POST(id),
      });

      updateComments(
        updatedPost.data.contentNode.commentCount,
        updatedPost.data.contentNode.comments,
        postId
      );
      setState({
        ...state,
        isSending: false,
        sent: true,
      });
      onSent();
    }
  };

  return (
    <div className={classnames('comments-pp__post', className)}>
      <FormField
        className={'comments-pp__input pp__input-name'}
        type={'text'}
        placeholder={`Ім'я`}
        onChange={handleInputChange}
        value={form.name}
        id={`name-${Math.random().toString(36).substr(2, 9)}`}
        required
        invalid={!form.name}
      />
      <FormField
        className={'comments-pp__input pp__input-message'}
        type={'placeholder'}
        placeholder={'Ваш коментар'}
        onChange={handleInputChange}
        value={form.message}
        id={`message-${Math.random().toString(36).substr(2, 9)}`}
        required
        invalid={!form.message}
      />
      <FormSubmit
        text={label}
        handleSubmit={handleSubmitComment}
        isSending={isSending}
        sent={sent}
        formValid={!!form.name && !!form.message}
        className={'comments-pp__btn'}
      />
    </div>
  );
};

export default CommentForm;
