import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import ArticleFeatured from '~/components/Article/Featured';
import ArticleAuthor from '~/components/Article/Author';
import { ArticleProvider } from '~/components/Article/Context';
import ArticleTitle from '~/components/Article/Title';

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
              let typeName = `${item.__typename.toLowerCase()}s`;
              if (typeName === 'posts') {
                typeName = 'news';
              }
              if (typeName === 'opportunitys') {
                typeName = 'opportunities';
              }
              return (
                <ArticleProvider key={item.id} value={typeName}>
                  <div className={'similar-posts__item'}>
                    <ArticleFeatured
                      slug={item.slug}
                      image={item.featuredImage}
                      className={'similar-posts__image'}
                    />
                    <div className={'similar-posts__about'}>
                      <ArticleTitle
                        className={'similar-posts__title'}
                        post={item}
                      />
                      <ArticleAuthor
                        author={item.author}
                        className={'similar-posts__author meta-author--grey'}
                      />
                    </div>
                  </div>
                </ArticleProvider>
              );
            })}
        </div>
      </div>
    </div>
  );
};

SimilarPosts.propTypes = {
  similarPosts: PropTypes.array,
  title: PropTypes.string,
  link: PropTypes.any,
};

export default SimilarPosts;
