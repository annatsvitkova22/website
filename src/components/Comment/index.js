import React, { useState } from 'react';
import * as moment from 'moment';
import { cloneDeep } from 'lodash';

import Icons from '~/components/Icons';
import CommentAction from '~/components/Comment/Action';
import CommentForm from '~/components/Comment/Form';

const Comment = ({ comment, post }) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const commentDisplayed = cloneDeep(comment);
  commentDisplayed.date = moment(commentDisplayed.date)
    .locale('uk')
    .format('D MMMM YYYY, HH:mm');
  const {
    author: { name },
    date,
    content,
    // TODO: check why likes null
    commentACF: { likes },
  } = commentDisplayed;

  const onReply = () => {
    setReplyOpen(!replyOpen);
  };

  return (
    <div className={'comments-pp__comment'}>
      <div className={'comments-pp__author'}>
        <div className={'comments-pp__name'}>
          <span>{name}</span>
          <span>{date}</span>
        </div>
      </div>
      <div
        className={'comments-pp__text'}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className={'comments-pp__actions'}>
        {likes && <span className="comments-pp__likes-count">{likes}</span>}
        {/* <CommentAction */}
        {/*  className={'comments-pp__actions-item'} */}
        {/*  icon={ */}
        {/*    <Icons */}
        {/*      icon={'like-comment'} */}
        {/*      className={'comments-pp__actions-icon'} */}
        {/*    /> */}
        {/*  } */}
        {/*  label={'Лайк'} */}
        {/* /> */}
        <CommentAction
          className={'comments-pp__actions-item'}
          icon={
            <Icons
              icon={'answer-comment'}
              className={'comments-pp__actions-icon'}
            />
          }
          label={'Відповісти'}
          action={onReply}
        />
        {/* <CommentAction */}
        {/*  className={'comments-pp__actions-item'} */}
        {/*  icon={ */}
        {/*    <Icons */}
        {/*      icon={'complain-comment'} */}
        {/*      className={'comments-pp__actions-icon'} */}
        {/*    /> */}
        {/*  } */}
        {/*  label={'Поскаржитися'} */}
        {/* /> */}
      </div>
      {replyOpen && (
        <CommentForm
          post={post}
          comment={comment}
          className="comments-pp__post--reply"
          label={'Відповісти'}
          onSent={() => setReplyOpen(!replyOpen)}
        />
      )}
    </div>
  );
};

export default Comment;
