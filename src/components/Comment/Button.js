import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CommentPopup from '~/components/Comment/Popup';
import Icons from '~/components/Icons';

const CommentButton = ({ post, postId }) => {
  const { commentCount } = post;
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const handleOpen = () => {
    setPopupIsOpen(true);
    document.querySelector('body').classList.add('isB-MenuOpen');
  };

  const handleClose = () => {
    setPopupIsOpen(false);
    document.querySelector('body').classList.remove('isB-MenuOpen');
  };

  return (
    <>
      <button className={`comments-button`} onClick={handleOpen}>
        <Icons icon={'comment'} />
        <span>Коментарі ({commentCount || '0'})</span>
      </button>
      {popupIsOpen && (
        <CommentPopup post={post} postId={postId} handleClose={handleClose} />
      )}
    </>
  );
};

CommentButton.propTypes = {
  post: PropTypes.any,
  postId: PropTypes.any,
};

export default CommentButton;
