import React from 'react';
import PropTypes from 'prop-types';

import Tags from '~/components/Tags';
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
    <section className={'single-post__title-wrapper col-lg-11'}>
      {!isLoad ? (
        <PostHeaderLoader />
      ) : (
        <>
          <Tags list={post.categories.nodes} className={'category'} />
          <h1>{post.title}</h1>
          <article
            className={'title__title'}
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
          <div className={'title__socials'}>
            <div className={'title__socials-about'}>
              <span className="title__socials-image" />
              <div className={'title__socials-author'}>
                <span className={'title__socials-name'}>
                  {post.author.firstName} {post.author.lastName}
                </span>
                <span className={'title__socials-date'}>
                  {date.toDateString()}
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
