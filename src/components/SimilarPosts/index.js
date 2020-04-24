import React from 'react';
import PropTypes from 'prop-types';

import ArticleFeatured from '~/components/Article/Featured';
import ArticleAuthor from '~/components/Article/Author';

const SimilarPosts = ({ similarPosts }) => {
  return (
    <div className={'similar-posts'}>
      <div className="similar-posts__wrapper">
        <span className={'similar-posts__type'}>Схожі новини</span>
        <div className={'similar-posts__items'}>
          {similarPosts &&
            similarPosts.map((item) => {
              return (
                <div key={item.id} className={'similar-posts__item'}>
                  <ArticleFeatured
                    image={item.featuredImage}
                    className={'similar-posts__image'}
                  />
                  <div className={'similar-posts__about'}>
                    <div className={'similar-posts__title'}>{item.title}</div>
                    <ArticleAuthor
                      author={item.author}
                      className={'similar-posts__author'}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

SimilarPosts.propTypes = {
  similarPosts: PropTypes.object,
};

export default SimilarPosts;