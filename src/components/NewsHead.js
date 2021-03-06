import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import he from 'he';

import PostHeaderLoader from '~/components/Loaders/PostHeaderLoader';
import ArticleTaxonomies from '~/components/Article/Taxonomies';

const NewsHead = (props) => {
  const { post } = props;

  const [isLoad, setIsLoad] = React.useState(false);

  useEffect(() => {
    post ? setIsLoad(!isLoad) : setIsLoad(false);
  }, []);

  return (
    <section className={'single-post__title-wrapper'}>
      {!isLoad ? (
        <PostHeaderLoader />
      ) : (
        <>
          <ArticleTaxonomies
            categories={post.categories}
            className={`category-label ${
              post.__typename === 'Publication' ? 'mt-l--small' : ''
            }`}
          />
          <h1 className={'title__title'}>{he.decode(post.title)}</h1>
        </>
      )}
    </section>
  );
};

NewsHead.propTypes = {
  post: PropTypes.any,
};

export default NewsHead;
