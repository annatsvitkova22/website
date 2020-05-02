import React from 'react';
import PropTypes from 'prop-types';

import Tags from '~/components/Tags';
import Share from '~/components/Share';
import CommentButton from '~/components/Comment/Button';
import LikeButton from '~/components/LikeButton';

const NewsFooter = ({ post }) => {
  const { tags } = post;
  return (
    <section className={'single-post__footer'}>
      <Tags list={tags.nodes} className={'tag'} />
      <div className={'footer__comments'}>
        <CommentButton className={'col-3'} post={post} />
        <div className={'footer__comments-share'}>
          <LikeButton showNumber={false} post={post} />
          <Share className={'title__socials-items'} />
        </div>
      </div>
    </section>
  );
};

NewsFooter.propTypes = {
  post: PropTypes.any,
};

export default NewsFooter;
