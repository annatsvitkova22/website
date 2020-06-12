import React from 'react';
import * as classnames from 'classnames';

const Avatar = ({ className, size, avatar, ...props }) => {
  let avatarUrl = '/assets/placeholders/user-placeholder.jpg';

  if (avatar) {
    avatarUrl = avatar[size] ? avatar[size] : avatar.mediaItemUrl;
  }

  return (
    <div className={classnames('avatar', className)}>
      <img className="avatar__image" src={avatarUrl} {...props} />
    </div>
  );
};

export default Avatar;
