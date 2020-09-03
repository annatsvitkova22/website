import React from 'react';
import * as classnames from 'classnames';
import * as moment from 'moment';
import PropTypes from 'prop-types';

import FeaturedImage from '~/components/FeaturedImage';
import NewsHead from '~/components/NewsHead';
import ArticleAuthor from '~/components/Article/Author';
import Share from '~/components/Share';

const ArticlePublicationBanner = ({ className, post, userAvatarStyles }) => {
  const {
    zmPublicationsACF: { bannerstyle = 'image' },
  } = post;

  moment.locale('uk');

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
          <FeaturedImage
            size={'full'}
            data={post.featuredImage}
            position={post.zmPublicationsACF.featuredImagePosition}
          />
          <div className="publication-banner__inner">
            <div className="container">
              <div className="publication-banner__content">
                <NewsHead post={post} />
                <div className={'title__socials'}>
                  <div className={'title__socials-about'}>
                    {userAvatarStyles &&
                      userAvatarStyles.backgroundImage.length > 1 && (
                        <span
                          className="title__socials-image avatar"
                          style={userAvatarStyles}
                        />
                      )}
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
          <div className="publication-banner__content">
            {post.zmBrandedPublication &&
              post.zmBrandedPublication.logo &&
                post.zmBrandedPublication.logo.mediaItemUrl && (
                <div className="branded-logo">
                  <img
                    src={post.zmBrandedPublication.logo.mediaItemUrl}
                    alt={post.zmBrandedPublication.logo.title}
                  />
                </div>
              )}
            <NewsHead post={post} />
            <div
              className="publication-banner__excerpt"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
            <div className={'title__socials'}>
              <div className={'title__socials-about'}>
                {userAvatarStyles &&
                  userAvatarStyles.backgroundImage.length > 0 && (
                    <span
                      className="title__socials-image avatar"
                      style={userAvatarStyles}
                    />
                  )}
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
          <FeaturedImage
            position={post.zmPublicationsACF.featuredImagePosition}
            data={post.featuredImage}
            type={post.__typename}
          />
        </div>
      )}
    </div>
  );
};

ArticlePublicationBanner.propTypes = {
  className: PropTypes.string,
  post: PropTypes.any,
  userAvatarStyles: PropTypes.any,
};

export default ArticlePublicationBanner;
