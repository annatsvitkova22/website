import React from 'react';
import * as moment from 'moment';

import Icons from '~/components/Icons';

const CommentsItem = ({ comment }) => {
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
        <div className={'comments-pp__actions-item'}>
          <Icons
            icon={'like-comment'}
            className={'comments-pp__actions-icon'}
          />
          <span>Лайк</span>
        </div>
        <div className={'comments-pp__actions-item'}>
          <Icons
            icon={'answer-comment'}
            className={'comments-pp__actions-icon'}
          />
          <span>Відповісти</span>
        </div>
        <div className={'comments-pp__actions-item'}>
          <Icons
            icon={'complain-comment'}
            className={'comments-pp__actions-icon'}
          />
          <span>Поскаржитися</span>
        </div>
      </div>
    </div>
  );
};

export default CommentsItem;
