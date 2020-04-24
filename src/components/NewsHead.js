import React, { useEffect } from 'react';
import PropTypes from 'prop-types';


import Tags from '~/components/Tags';
import ShareItems from '~/components/ShareItems';
import PostHeaderLoader from '~/components/Loaders/PostHeaderLoader';
import ArticleAuthor from '~/components/Article/Author';

const NewsHead = (props) => {
  const { post } = props;


  const [isLoad, setIsLoad] = React.useState(false);

  useEffect(() => {
    post ? setIsLoad(!isLoad) : setIsLoad(false);
  }, []);

  return (
    <section className={'single-post__title-wrapper col-xl-11'}>
      {!isLoad ? (
        <PostHeaderLoader />
      ) : (
        <>
          <Tags list={post.categories.nodes} className={'category'} />
          <h1 className={'title__title'}>{post.title}</h1>
        </>
      )}
    </section>
  );
};

NewsHead.propTypes = {
  post: PropTypes.any,
};

export default NewsHead;
