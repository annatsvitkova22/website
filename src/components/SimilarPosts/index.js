import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import ArticleFeatured from '~/components/Article/Featured';
import ArticleAuthor from '~/components/Article/Author';

const SimilarPosts = ({ similarPosts, title = 'Схожі', link }) => {

  return (
    <div className={'similar-posts'}>
      <div className="similar-posts__wrapper">
        <div className="similar-posts__meta">
          <span className={'similar-posts__type'}>{title}</span>
          {link && (
            <Link href={link.value}>
              <a className={'similar-posts__link'} href={link.value}>
                {link.label}
              </a>
            </Link>
          )}
        </div>
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
                      className={'similar-posts__author meta-author--black'}
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
  similarPosts: PropTypes.array,
};

export default SimilarPosts;
