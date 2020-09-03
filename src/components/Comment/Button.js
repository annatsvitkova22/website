import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FacebookProvider, CommentsCount } from 'react-facebook';

import CommentPopup from '~/components/Comment/Popup';
import Icons from '~/components/Icons';

const CommentButton = ({ post, postId }) => {
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
        <span className={'post-comments-count'}>
          Коментарі (
          {typeof window !== 'undefined' && (
            <FacebookProvider appId="595420217740360" language={'uk_UA'}>
              <CommentsCount href={window.location.href} />
            </FacebookProvider>
          )}
          )
        </span>
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
