import React from 'react';
import PropTypes from 'prop-types';

import ShareItems from '~/components/Share';
import Comment from '~/components/Comment/index';
import Icons from '~/components/Icons';
import CommentForm from '~/components/Comment/Form';

const CommentPopup = ({ post, postId, handleClose }) => {
  const { comments } = post;

  return (
    <>
      <div className={'comments-pp__wrapper'}>
        <div className={'comments-pp'}>
          <div className={'comments-pp__close'}>
            <button onClick={handleClose} className={'comments-pp__close-btn'}>
              <Icons icon={'close-comment'} />
            </button>
          </div>
          <div className="comments-pp__container">
            <div className={'comments-pp__header'}>
              <span>Коментарі</span>
              <ShareItems className={'comments-pp__socials-items'} />
            </div>
            <CommentForm post={post} postId={postId} />
            <div className="comments-pp__items">
              {comments.nodes.map((comment) => (
                <Comment
                  key={comment.commentId}
                  post={post}
                  comment={comment}
                  postId={postId}
                />
              ))}
            </div>
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
