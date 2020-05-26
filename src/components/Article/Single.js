import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import StickyBox from 'react-sticky-box';
import Head from 'next/head';
import * as classnames from 'classnames';
import gql from 'graphql-tag';
import { useStateLink } from '@hookstate/core';
import * as moment from 'moment';
import getConfig from 'next/config';
import he from 'he';
import * as _ from 'lodash';
import { Waypoint } from 'react-waypoint';

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
import singleContentCommon from '~/lib/GraphQL/singleContentCommon';

const PUBLICATION = gql`
  query Publication ($publId: [ID]){
    publications(first: 1, where: {notIn: $publId}) {
      nodes {
        publicationId
        zmPublicationsACF {
          bannerstyle
        }
        ${singleContentCommon}
      }
    }
  }
`;

// const  query PageQuery {
//   publications(first: 1, where: {notIn: ["5008", "5006"]}) {
//     nodes {
//       publicationId
//       id
//       title
//       slug
//     }
//   }
// }

const { publicRuntimeConfig } = getConfig();
const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const ArticleSingle = ({
  type,
  post,
  sidebar,
  hasShare,
  similarPosts,
  loadNewArticle,
  postId,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  moment.locale('uk');

  const stateLink = useStateLink(
    CreateSingleArticleStore(post, loaded, postId)
  );
  const state = stateLink.get();

  const storedPost = state[postId];

  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  useEffect(() => {
    if (type === 'publication') {
      const singleArticleStore = SingleArticleStore.get();
      if (post) {
        singleArticleStore[post.publicationId] = post;
        SingleArticleStore.set(singleArticleStore);
      }
    }
    if (type === 'news') {
      const singleArticleStore = SingleArticleStore.get();
      if (post) {
        singleArticleStore[post.postId] = post;
        SingleArticleStore.set(singleArticleStore);
      }
    }
    if (type === 'blogs') {
      const singleArticleStore = SingleArticleStore.get();
      if (post) {
        singleArticleStore[post.blogId] = post;
        SingleArticleStore.set(singleArticleStore);
      }
    }
  }, [post]);

  useViewsCounter(post);

  const userAvatarStyles = {
    backgroundImage: storedPost.author.userAdditionalACF.avatar
      ? `url(${storedPost.author.userAdditionalACF.avatar.mediaItemUrl})`
      : '',
    backgroundSize: 'cover',
  };

  return (
    <>
      <Head>
        <title>ЗМІСТ - {storedPost.title}</title>

        <meta property="twitter:card" content="summary_large_image" />

        <meta name="title" content={storedPost.title} />
        <meta
          name="description"
          content={he.decode(
            storedPost.excerpt
              .replace(/<[^>]+>/g, '')
              .replace('[&hellip;]', '...')
          )}
        />

        <meta property="og:title" content={storedPost.title} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={storedPost.date} />
        <meta
          property="og:description"
          content={he.decode(
            storedPost.excerpt
              .replace(/<[^>]+>/g, '')
              .replace('[&hellip;]', '...')
          )}
        />
        <meta
          property="og:url"
          content={`${config.frontUrl}/${type}/${storedPost.slug}`}
        />
        <meta
          property="twitter:url"
          content={`${config.frontUrl}/${type}/${storedPost.slug}`}
        />
        <meta property="twitter:title" content={he.decode(storedPost.title)} />
        <meta
          property="twitter:description"
          content={he.decode(
            storedPost.excerpt
              .replace(/<[^>]+>/g, '')
              .replace('[&hellip;]', '...')
          )}
        />
        {storedPost &&
          storedPost.featuredImage &&
          storedPost.featuredImage.mediaItemUrl && (
            <>
              <meta
                property="twitter:image"
                content={storedPost.featuredImage.mediaItemUrl}
              />
              <meta
                property="og:image"
                content={storedPost.featuredImage.mediaItemUrl}
              />
            </>
          )}
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
                <Waypoint
                  onEnter={_.debounce(() => {
                    Router.replace(
                      `/${type}/[slug]?slug=${storedPost.slug}`,
                      `/${type}/${storedPost.slug}`,
                      { shallow: true }
                    );
                  }, 50)}
                />
                <div className="container">
                  <section className={'single-post__main'}>
                    <div className={'title__socials--mobile'}>
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
                      <Share
                        type={'main-first'}
                        className={'title__socials-items'}
                      />
                    </div>
                    {hasShare && (
                      <div className={'side-bar__wrapper'}>
                        <StickyBox
                          offsetTop={272}
                          offsetBottom={20}
                          className="side-bar__sticky"
                        >
                          <ActionsSidebar
                            post={storedPost}
                            postId={storedPost.publicationId}
                          />
                        </StickyBox>
                      </div>
                    )}
                    <div className="single-post__content">
                      {storedPost.blocks.length ? (
                        <Content
                          content={storedPost.blocks}
                          className={'content__posts'}
                        />
                      ) : (
                        <Content
                          content={storedPost.content}
                          className={'content__posts'}
                        />
                      )}
                      <NewsFooter
                        post={storedPost}
                        postId={storedPost.publicationId}
                      />
                      {!hasEntered && (
                        <Waypoint
                          onEnter={() => {
                            if (loadNewArticle) {
                              loadNewArticle();
                            }

                            setHasEntered(true);
                          }}
                          onLeave={() => setHasEntered(true)}
                        />
                      )}
                    </div>
                  </section>
                </div>
                {similarPosts && (
                  <div className="container">{similarPosts}</div>
                )}
                <Waypoint
                  onEnter={_.debounce(() => {
                    Router.replace(
                      `/${type}/[slug]?slug=${storedPost.slug}`,
                      `/${type}/${storedPost.slug}`,
                      { shallow: true }
                    );
                  }, 50)}
                />
              </>
            ) : (
              <PublicationSingleLoader />
            )}
          </>
        ) : (
          <>
            {storedPost ? (
              <>
                <div className={'row'}>
                  <div
                    className={classnames('col-12', {
                      'col-xl-9': sidebar,
                    })}
                  >
                    <div className="single-post__block-wrapper">
                      <NewsHead post={storedPost} />
                      <FeaturedImage data={storedPost.featuredImage} />
                    </div>
                    <Waypoint
                      onEnter={_.debounce(() => {
                        Router.replace(
                          `/${type}/[slug]?slug=${storedPost.slug}`,
                          `/${type}/${storedPost.slug}`,
                          { shallow: true }
                        );
                      }, 50)}
                    />

                    <section className={'single-post__main'}>
                      {hasShare && (
                        <StickyBox
                          offsetTop={272}
                          offsetBottom={20}
                          className="side-bar__sticky"
                        >
                          <ActionsSidebar post={storedPost} />
                        </StickyBox>
                      )}
                      <section className={'single-post__block-wrapper'}>
                        <div className="single-post__content">
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
                          {/* Need to delete - only for testing*/}
                          {/*<Story />*/}
                          {/* Need to delete - only for testing*/}
                          {storedPost.blocks.length ? (
                            <Content
                              content={storedPost.blocks}
                              className={'content__posts'}
                            />
                          ) : (
                            <Content
                              content={storedPost.content}
                              className={'content__posts'}
                            />
                          )}
                          <Waypoint
                            onEnter={_.debounce(() => {
                              Router.replace(
                                `/${type}/[slug]?slug=${storedPost.slug}`,
                                `/${type}/${storedPost.slug}`,
                                { shallow: true }
                              );
                            }, 50)}
                          />
                          <NewsFooter post={storedPost} />
                        </div>
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
