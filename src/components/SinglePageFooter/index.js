import React from 'react';
import PropTypes from 'prop-types';

import Tags from '~/components/Tags';
import ShareItems from '~/components/ShareItems';
import CommentsButton from '~/components/CommentsButton';
import Icons from '~/components/Icons';

const NewsFooter = ({ post }) => {
  return (
    <section className={'single-post__footer'}>
      <Tags list={post.tags.nodes} className={'tag'} />
      <div className={'footer__comments'}>
        <CommentsButton className={'col-3'} commetnts={post.comments} />
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
