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
      <div className="single-post container">
        <div className={'single-post__title row'}>
          <div
            className={classnames('single-post__wrapper', {
              'col-md-9': sidebar,
              'col-12': !sidebar,
            })}
          >
            <div className="single-post__title-wrapper col-xl-11">
              <PostHeaderLoader type={type} />
            </div>
          </div>
          {sidebar && <aside className={'col-md-3'}>{sidebar}</aside>}
        </div>
      </div>
    );
  }

  const userAvatarStyles = {
    backgroundImage: storedPost.author.userAdditionalACF.avatar
      ? `url(${storedPost.author.userAdditionalACF.avatar.mediaItemUrl})`
      : '',
    backgroundSize: 'cover',
  };

  return (
    <>
      <Head>
        <title>{storedPost.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={classnames('single-post container', `single-post--${type}`)}
      >
        {storedPost ? (
          <>
            <div className={'single-post__title row'}>
              <div className={'single-post__wrapper col-xl-9 col-12'}>
                <NewsHead post={storedPost} />
                <FeaturedImage data={storedPost.featuredImage} />
                <section className={'single-post__main col-12'}>
                  {hasShare && (
                    <StickyBox
                      offsetTop={70}
                      offsetBottom={20}
                      className={'side-bar__wrapper col-xl-1'}
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
                            className={'title__socials-name meta-author--black'}
                          />
                          <span className={'title__socials-date'}>
                            {moment(storedPost.date).format('LLL')}
                          </span>
                        </div>
                      </div>
                      <Share
                        type={'main-first'}
                        className={'title__socials-items'}
                      />
                    </div>
                    <article
                      className={'title__description'}
                      dangerouslySetInnerHTML={{ __html: storedPost.excerpt }}
                    />
                    <Content
                      content={storedPost.blocks}
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
      </main>
    </>
  );
};

export default ArticleSingle;
