import React from 'react';
import * as classnames from 'classnames';

const Avatar = ({ className, avatar, ...props }) => {
  if (!avatar || avatar.mediaItemUrl) return null;
  const { mediaItemUrl } = avatar;

  return <div className={classnames('avatar', className)}>
    <img className="avatar__image" src={mediaItemUrl} {...props} />
  </div>
}

export default Avatar;
