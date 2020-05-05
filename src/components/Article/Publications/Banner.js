import React from 'react';
import * as classnames from 'classnames';
import * as moment from 'moment';

import FeaturedImage from '~/components/FeaturedImage';
import NewsHead from '~/components/NewsHead';
import ArticleAuthor from '~/components/Article/Author';
import Share from '~/components/Share';

const ArticlePublicationBanner = ({ className, post, userAvatarStyles }) => {
  const {
    zmPublicationsACF: { bannerstyle = 'image' },
  } = post;

  moment.locale('uk');

  console.log(userAvatarStyles);

  return (
    <div
      className={classnames(
        'publication-banner',
        className,
        `publication-banner--${bannerstyle}`
      )}
    >
      {bannerstyle === 'image' && (
        <>
          <FeaturedImage size={'full'} data={post.featuredImage} />
          <div className="publication-banner__inner">
            <div className="container">
              <div className="col-md-8 publication-banner__content">
                <NewsHead post={post} />
                <div className={'title__socials'}>
                  <div className={'title__socials-about'}>
                    <span
                      className="title__socials-image avatar"
                      style={userAvatarStyles}
                    />
                    <div className={'title__socials-author'}>
                      <ArticleAuthor
                        author={post.author}
                        className={'title__socials-name meta-author--white'}
                      />
                      <span className={'title__socials-date'}>
                        {moment(post.date).format('DD MMMM, HH:MM')}
                      </span>
                    </div>
                  </div>
                  <Share
                    color={'white'}
                    type={'main-first'}
                    className={
                      'title__socials-items title__socials-items--white'
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {bannerstyle !== 'image' && (
        <div className="container">
          <div className="col-md-8 publication-banner__content">
            <NewsHead post={post} />
            <div
              className="publication-banner__excerpt"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
            <div className={'title__socials'}>
              <div className={'title__socials-about'}>
                <span
                  className="title__socials-image avatar"
                  style={userAvatarStyles}
                />
                <div className={'title__socials-author'}>
                  <ArticleAuthor
                    author={post.author}
                    className={'title__socials-name'}
                  />
                  <span className={'title__socials-date'}>
                    {moment(post.date).format('DD MMMM, HH:MM')}
                  </span>
                </div>
              </div>
              <Share type={'main-first'} className={'title__socials-items'} />
            </div>
          </div>
          <FeaturedImage size={'full'} data={post.featuredImage} />
        </div>
      )}
    </div>
  );
};

export default ArticlePublicationBanner;
