import React from 'react';
import PropTypes from 'prop-types';

import Tags from '~/components/Tags';
import ShareItems from '~/components/ShareItems';
import CommentButton from '~/components/Comment/Button';
import Icons from '~/components/Icons';

const NewsFooter = ({ post }) => {
  const { tags } = post;
  return (
    <section className={'single-post__footer'}>
      <Tags list={tags.nodes} className={'tag'} />
      <div className={'footer__comments'}>
        <CommentButton className={'col-3'} post={post} />
        <div className={'footer__comments-share'}>
          <button className={'like'}>
            <Icons icon={'likes'} />
          </button>
          <ShareItems className={'title__socials-items'} />
        </div>
      </div>
    </section>
  );
};

NewsFooter.propTypes = {
  post: PropTypes.any,
};

export default NewsFooter;
