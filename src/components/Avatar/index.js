import React from 'react';
import * as classnames from 'classnames';

const Avatar = ({ className, avatar, ...props }) => {
  if (!avatar || (!avatar.mediaItemUrl && !avatar.url)) return null;

  if (avatar.mediaItemUrl) {
    return (
      <div className={classnames('avatar', className)}>
        <img className="avatar__image" src={avatar.mediaItemUrl} {...props} />
      </div>
    );
  }
  if (avatar.url) {
    return (
      <div className={classnames('avatar', className)}>
        <img className="avatar__image" src={avatar.url} {...props} />
      </div>
    );
  }
  return null;
};

export default Avatar;
