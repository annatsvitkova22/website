import React, { useState, useEffect } from 'react';
import StickyBox from 'react-sticky-box';
import Head from 'next/head';
import moment from 'moment';
import * as classnames from 'classnames';
import { useStateLink } from '@hookstate/core';

import PostHeaderLoader from '~/components/Loaders/PostHeaderLoader';
import NewsHead from '~/components/NewsHead';
import FeaturedImage from '~/components/FeaturedImage';
import ActionsSidebar from '~/components/ActionsSidebar';
import ArticleAuthor from '~/components/Article/Author';
import Share from '~/components/Share';
import Content from '~/components/Content';
import NewsFooter from '~/components/SinglePageFooter';
import {
  CreateSingleArticleStore,
  SingleArticleStore,
} from '~/stores/SingleArticle';
import useViewsCounter from '~/hooks/useViewsCounter';
import PublicationSingleLoader from '~/components/Loaders/PublicationSingleLoader';
import ArticlePublicationBanner from '~/components/Article/Publications/Banner';
import ArticleDate from '~/components/Article/Date';

const ArticleSingle = ({ type, post, sidebar, hasShare, similarPosts }) => {
  const [loaded, setLoaded] = useState(false);

  const stateLink = useStateLink(CreateSingleArticleStore(post, loaded));

  const state = stateLink.get();
  const storedPost = state.post;

  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  useEffect(() => {
    if (post) {
      SingleArticleStore.set({ post });
    }
  }, [post]);

  useViewsCounter(post);

  if (!storedPost) {
    return (
      <>
        {type === 'publications' && <PublicationSingleLoader />}
        {type !== 'publications' && (
          <div className="single-post container">
            <div className={'single-post__title row'}>
              <>
                <div
                  className={classnames('single-post__wrapper', {
                    'col-xl-9': sidebar,
                    'col-12': !sidebar,
                  })}
                >
                  <div className="single-post__title-wrapper col-xl-11">
                    <PostHeaderLoader type={type} />
                  </div>
                </div>
                {sidebar && <aside className={'col-md-3'}>{sidebar}</aside>}
              </>
            </div>
          </div>
        )}
      </>
    );
  }

  const userAvatarStyles = {
    backgroundImage: storedPost.author.userAdditionalACF.avatar
      ? `url(${storedPost.author.userAdditionalACF.avatar.mediaItemUrl})`
      : '',
    backgroundSize: 'cover',
  };

  console.log(storedPost.content);
  return (
    <>
      <Head>
        <title>{storedPost.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={classnames('single-post', `single-post--${type}`, {
          container: type !== 'publications',
        })}
      >
        {type === 'publications' ? (
          <>
            {storedPost ? (
              <>
                <ArticlePublicationBanner
                  className="single-post__banner"
                  post={storedPost}
                  userAvatarStyles={userAvatarStyles}
                />
                <section className={'single-post__main container'}>
                  <div className="row">
                    {hasShare && (
                      <div className={'side-bar__wrapper col-md-1'}>
                        <ActionsSidebar post={storedPost} />
                      </div>
                    )}
                    <div className="single-post__content col-lg-6 col-md-8">
                      <Content
                        content={storedPost}
                        className={'content__posts'}
                      />
                      <NewsFooter post={storedPost} />
                    </div>
                  </div>
                </section>
                {similarPosts && (
                  <div className="container">{similarPosts}</div>
                )}
              </>
            ) : (
              <PublicationSingleLoader />
            )}
          </>
        ) : (
          <>
            {storedPost ? (
              <>
                <div className={'single-post__title row'}>
                  <div
                    className={classnames(
                      'single-post__wrapper col-12 no-gutters',
                      {
                        'col-xl-9': sidebar,
                      }
                    )}
                  >
                    <NewsHead post={storedPost} />
                    <FeaturedImage data={storedPost.featuredImage} />
                    <section className={'single-post__main col-12'}>
                      {hasShare && (
                        <StickyBox
                          offsetTop={272}
                          offsetBottom={20}
                          className={'side-bar__wrapper'}
                        >
                          <ActionsSidebar post={storedPost} />
                        </StickyBox>
                      )}
                      <section className={'single-post__content'}>
                        <div className={'title__socials'}>
                          <div className={'title__socials-about'}>
                            <span
                              className="title__socials-image"
                              style={userAvatarStyles}
                            />
                            <div className={'title__socials-author'}>
                              <ArticleAuthor
                                author={storedPost.author}
                                className={
                                  'title__socials-name meta-author--black'
                                }
                              />
                              <ArticleDate
                                className={'title__socials-date'}
                                date={storedPost.date}
                                format={'DD MMMM YYYY, HH:MM'}
                              />
                            </div>
                          </div>
                          <Share
                            type={'main-first'}
                            className={'title__socials-items'}
                          />
                        </div>
                        <article
                          className={'title__description'}
                          dangerouslySetInnerHTML={{
                            __html: storedPost.excerpt,
                          }}
                        />
                        <Content
                          content={storedPost}
                          className={'content__posts'}
                        />
                        <NewsFooter post={storedPost} />
                      </section>
                    </section>
                  </div>
                  {sidebar && (
                    <StickyBox
                      offsetTop={118}
                      offsetBottom={20}
                      className={'sidebar__wrapper col-xl-3'}
                    >
                      {sidebar}
                    </StickyBox>
                  )}
                </div>
                {similarPosts && similarPosts}
              </>
            ) : (
              <PostHeaderLoader />
            )}
          </>
        )}
      </main>
    </>
  );
};

export default ArticleSingle;
