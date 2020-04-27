import React from 'react';
import StickyBox from 'react-sticky-box';
import Head from 'next/head';
import moment from 'moment';
import * as classnames from 'classnames';

import PostHeaderLoader from '~/components/Loaders/PostHeaderLoader';
import NewsHead from '~/components/NewsHead';
import FeaturedImage from '~/components/FeaturedImage';
import Share from '~/components/ShareSideBar';
import ArticleAuthor from '~/components/Article/Author';
import ShareItems from '~/components/ShareItems';
import Content from '~/components/Content';
import NewsFooter from '~/components/SinglePageFooter';

const ArticleSingle = ({ type, post, sidebar, hasShare, similarPosts }) => {
  if (!post) {
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
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={classnames('single-post container', `single-post--${type}`)}
      >
        {post ? (
          <>
            <div className={'single-post__title row'}>
              <div className={'single-post__wrapper col-xl-9 col-12'}>
                <NewsHead post={post} />
                <FeaturedImage data={post.featuredImage} />
                <section className={'single-post__main col-12'}>
                  {hasShare && (
                    <StickyBox
                      offsetTop={70}
                      offsetBottom={20}
                      className={'side-bar__wrapper col-xl-1'}
                    >
                      <Share />
                    </StickyBox>
                  )}
                  <section className={'single-post__content'}>
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
                    <article
                      className={'title__description'}
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <Content
                      content={post.blocks}
                      className={'content__posts'}
                    />
                    <NewsFooter post={post} />
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
