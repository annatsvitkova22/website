import React from 'react';
import PropTypes from 'prop-types';

import Tags from '~/components/Tags';
import FeaturedImage from '~/components/FeaturedImage';
import ShareItems from '~/components/ShareItems';
import PostHeaderLoader from '~/components/Loaders/PostHeaderLoader';

const NewsHead = (props) => {
  const { post } = props;

  const date = new Date(post.date);
  const [isLoad, setIsLoad] = React.useState(false);

  React.useEffect(() => {
    post ? setIsLoad(!isLoad) : setIsLoad(false);
  }, []);

  return (
    <section className={'title'}>
      {!isLoad ? (
        <PostHeaderLoader />
      ) : (
        <>
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
        </>
      )}
    </section>
  );
};

NewsHead.propTypes = {
  post: PropTypes.any,
};

export default NewsHead;
