import React from 'react';
import * as classnames from 'classnames';

const CommentAction = ({ className, action = () => {}, icon, label }) => {
  return (
    <div className={classnames('comment-action', className)} onClick={action}>
      {icon && icon}
      <span>{label}</span>
    </div>
  );
};

export default CommentAction;
