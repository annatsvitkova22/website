import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Tags from '~/components/Tags';
import ShareItems from '~/components/ShareItems';
import PostHeaderLoader from '~/components/Loaders/PostHeaderLoader';
import ArticleAuthor from '~/components/Article/Author';

const NewsHead = (props) => {
  const { post } = props;
  moment.locale('uk');

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
          <article
            className={'title__description'}
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
          <div className={'title__socials'}>
            <div className={'title__socials-about'}>
              <span className="title__socials-image" />
              <div className={'title__socials-author'}>
                <ArticleAuthor
                  author={post.author}
                  className={'title__socials-name'}
                />
                <span className={'title__socials-date'}>
                  {moment(post.date).format('LLL')}
                </span>
              </div>
            </div>
            <ShareItems className={'title__socials-items'} />
          </div>
        </>
      )}
    </section>
  );
};

NewsHead.propTypes = {
  post: PropTypes.any,
};

export default NewsHead;
