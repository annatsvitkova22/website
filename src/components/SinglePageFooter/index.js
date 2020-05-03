import React from 'react';
import PropTypes from 'prop-types';

import Share from '~/components/Share';
import CommentButton from '~/components/Comment/Button';
import LikeButton from '~/components/LikeButton';
import ArticleTaxonomies from '~/components/Article/Taxonomies';

const NewsFooter = ({ post }) => {
  const { tags } = post;
  return (
    <section className={'single-post__footer'}>
      <ArticleTaxonomies tags={tags} className={'tag-item'} />
      <div className={'footer__comments'}>
        <CommentButton className={'col-3'} post={post} />
        <div className={'footer__comments-share'}>
          <LikeButton showNumber={false} post={post} />
          <Share type={'main-first'} className={'title__socials-items'} />
        </div>
      </div>
    </section>
  );
};

NewsFooter.propTypes = {
  post: PropTypes.any,
};

export default NewsFooter;
