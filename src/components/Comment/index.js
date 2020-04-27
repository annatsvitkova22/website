import React from 'react';
import * as moment from 'moment';

import Icons from '~/components/Icons';
import CommentAction from '~/components/Comment/Action';

const Comment = ({ comment }) => {
  const {
    author: { name },
    date,
    content,
  } = comment;

  return (
    <div className={'comments-pp__comment'}>
      <div className={'comments-pp__author'}>
        <div className={'comments-pp__name'}>
          <span>{name}</span>
          <span>{moment(date).locale('uk').format('D MMMM YYYY, HH:mm')}</span>
        </div>
      </div>
      <div
        className={'comments-pp__text'}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className={'comments-pp__actions'}>
        <CommentAction
          className={'comments-pp__actions-item'}
          icon={
            <Icons
              icon={'like-comment'}
              className={'comments-pp__actions-icon'}
            />
          }
          label={'Лайк'}
        />
        <CommentAction
          className={'comments-pp__actions-item'}
          icon={
            <Icons
              icon={'answer-comment'}
              className={'comments-pp__actions-icon'}
            />
          }
          label={'Відповісти'}
        />
        <CommentAction
          className={'comments-pp__actions-item'}
          icon={
            <Icons
              icon={'complain-comment'}
              className={'comments-pp__actions-icon'}
            />
          }
          label={'Поскаржитися'}
        />
      </div>
    </div>
  );
};

export default Comment;
