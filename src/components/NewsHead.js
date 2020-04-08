import React from 'react';
import PropTypes from 'prop-types';

import Tags from '~/components/Tags';
import FeaturedImage from '~/components/FeaturedImage';
import ShareItems from '~/components/ShareItems';

const NewsHead = ({ post }) => {
  const date = new Date(post.date);
  return (
    <section className={'title'}>
      <Tags list={post.categories.nodes} className={'category'} />
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: post.excerpt }} />
      <div className={'title__wrapper'}>
        <div className={'title__author'}>
          <span>
            {post.author.firstName} {post.author.lastName}
          </span>
          <span>{date.toDateString()}</span>
        </div>
        <div className={'title__social'}>
          <ShareItems />
        </div>
      </div>
      <FeaturedImage data={post.featuredImage} />
    </section>
  );
};

NewsHead.propTypes = {
  post: PropTypes.any,
};

export default NewsHead;
