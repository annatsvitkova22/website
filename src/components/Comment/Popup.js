import React from 'react';
import PropTypes from 'prop-types';
import { FacebookProvider, Comments } from 'react-facebook';

import ShareItems from '~/components/Share';
import Icons from '~/components/Icons';

const CommentPopup = ({ handleClose }) => {
  return (
    <>
      <div className={'comments-pp__wrapper'}>
        <div className={'comments-pp'}>
          <div className={'comments-pp__close'}>
            <button onClick={handleClose} className={'comments-pp__close-btn'}>
              <Icons icon={'close-comment'} />
            </button>
          </div>
          <div className="comments-pp__container container">
            <div className={'comments-pp__header'}>
              <span>Коментарі</span>
              <ShareItems className={'comments-pp__socials-items'} />
            </div>
            <FacebookProvider appId="595420217740360" language={'uk_UA'}>
              <Comments href={window.location.href} />
            </FacebookProvider>
          </div>
        </div>
      </div>
    </>
  );
};

CommentPopup.propTypes = {
  postId: PropTypes.any,
  post: PropTypes.object,
  handleClose: PropTypes.func,
};

export default CommentPopup;
