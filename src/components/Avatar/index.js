import React from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';

const Avatar = ({ className, size, avatar, ...props }) => {
  let avatarUrl = '/assets/placeholders/user-placeholder.jpg';

  if (avatar) {
    if (avatar.url) {
      avatarUrl = avatar[size] ? avatar[size] : avatar.url;
    } else {
      avatarUrl = avatar[size] ? avatar[size] : avatar.mediaItemUrl;
    }
  }

  return (
    <div className={classnames('avatar', className)}>
      <img className="avatar__image" src={avatarUrl} {...props} />
    </div>
  );
};

export default Avatar;

Avatar.propTypes = {
  className: PropTypes.string,
  size: PropTypes.any,
  avatar: PropTypes.any,
};
