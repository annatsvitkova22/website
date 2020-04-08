import React from 'react';
import PropTypes from 'prop-types';

import Tags from '~/components/Tags';
import ShareItems from '~/components/ShareItems';
import CommentsButton from '~/components/CommentsButton';

const NewsFooter = ({ post }) => {
  return (
    <section className={'news-footer'}>
      <Tags list={post.tags.nodes} className={'tag'} />
      <div className={'news-footer__comments row no-gutters'}>
        <CommentsButton className={'col-3'} commetnts={post.comments} />
        <div className={'comments__share col-4'}>
          <span className={'like'}>!</span>
          <ShareItems />
        </div>
      </div>
    </section>
  );
};

NewsFooter.propTypes = {
  post: PropTypes.any,
};

export default NewsFooter;
