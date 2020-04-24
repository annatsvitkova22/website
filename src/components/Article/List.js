import React from 'react';
import * as classnames from 'classnames';

const ArticleList = ({ post, className }) => {
  return (
    <ul className={classnames('article-list', className)}>
      <li>{post.zmAfishaACF.eventAddress.streetAddress}</li>
      <li>
        {post.zmAfishaACF.eventDays &&
          post.zmAfishaACF.eventDays.map((day, i) => (
            <span key={i}>{day.day}</span>
          ))}
      </li>
      <li>{post.zmAfishaACF.eventTime}</li>
    </ul>
  );
};

export default ArticleList;
