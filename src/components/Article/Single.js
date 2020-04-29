import React, { useState, useEffect } from 'react';
import StickyBox from 'react-sticky-box';
import Head from 'next/head';
import moment from 'moment';
import * as classnames from 'classnames';
import { useStateLink } from '@hookstate/core';

import PostHeaderLoader from '~/components/Loaders/PostHeaderLoader';
import NewsHead from '~/components/NewsHead';
import FeaturedImage from '~/components/FeaturedImage';
import Share from '~/components/ShareSideBar';
import ArticleAuthor from '~/components/Article/Author';
import ShareItems from '~/components/ShareItems';
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
      <div className={'container'}>
        <div className={'row'}>
          <div
            className={classnames({
              'col-md-9': sidebar,
              'col-12': !sidebar,
            })}
          >
            <PostHeaderLoader type={type} />
          </div>
          {sidebar && <aside className={'col-md-3'}>{sidebar}</aside>}
        </div>
      </div>
    );
  }

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
                      <Share post={storedPost} />
                    </StickyBox>
                  )}
                  <section className={'single-post__content'}>
                    <div className={'title__socials'}>
                      <div className={'title__socials-about'}>
                        <span className="title__socials-image" />
                        <div className={'title__socials-author'}>
                          <ArticleAuthor
                            author={storedPost.author}
                            className={'title__socials-name'}
                          />
                          <span className={'title__socials-date'}>
                            {moment(storedPost.date).format('LLL')}
                          </span>
                        </div>
                      </div>
                      <ShareItems className={'title__socials-items'} />
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