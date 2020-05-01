import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { useStateLink } from '@hookstate/core';
import StickyBox from 'react-sticky-box';

import apolloClient from '~/lib/ApolloClient';
import gutenbergBlocksQuery from '~/lib/GraphQL/gutenbergBlocksQuery';
import ActionbarLoader from '~/components/Loaders/ActionbarLoader';
import SidebarLoader from '~/components/Loaders/SidebarLoader';
import PostHeaderLoader from '~/components/Loaders/PostHeaderLoader';
import getCFStatus from '~/lib/getCFStatus';
import ArticleStatus from '~/components/Article/Status';
import CrowdfundingProgress from '~/components/Crowdfunding/Progress';
import CrowdfundingStats from '~/components/Crowdfunding/Stats';
import CrowdfundingActions from '~/components/Crowdfunding/Actions';
import CrowdfundingSupported from '~/components/Crowdfunding/Supported';
import FeaturedImage from '~/components/FeaturedImage';
import ArticleAuthor from '~/components/Article/Author';
import ArticleDate from '~/components/Article/Date';
import Content from '~/components/Content';
import useViewsCounter from '~/hooks/useViewsCounter';
import {
  CreateSingleArticleStore,
  SingleArticleStore,
} from '~/stores/SingleArticle';
import Avatar from '~/components/Avatar';

export const CROWDFUNDING = gql`
  query Crowdfunding($slug: String!) {
    crowdfundingBy(slug: $slug) {
      ${gutenbergBlocksQuery}
      id
      crowdfundingId
      title
      slug
      date
      statisticsACF {
        views
      }
      author {
        id
        name
        nicename
        nickname
        username
        avatar {
          url
        }
      }
      featuredImage {
        mediaItemUrl
      }
      cfACF {
        tocollect
        expiration
        collected
        shared
        supported {
          name
          sum
          date
          photo {
            mediaItemUrl
          }
        }
      }
    }
  }
`;

const Crowdfunding = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState({
    post: props.post,
  });

  const { post, isLoading } = state;

  useEffect(() => {
    setLoaded(true);
  }, [state.post]);

  const stateLink = useStateLink(CreateSingleArticleStore(post, loaded));
  const storedPost = stateLink.get().post;

  useEffect(() => {
    async function loadData() {
      if (!isLoading) {
        setState({
          ...state,
          isLoading: true,
        });
      }

      const postResponse = await apolloClient.query({
        query: CROWDFUNDING,
        variables: {
          slug: props.slug,
        },
      });

      SingleArticleStore.set({ post: postResponse.data.crowdfundingBy });

      setState({
        ...state,
        post: postResponse.data.crowdfundingBy,
        isLoading: false,
      });
    }

    if (props.slug && !post) {
      setState({
        ...state,
        isLoading: true,
      });
      loadData();
    }
  }, []);

  useViewsCounter(post);

  if (!storedPost) {
    return (
      <div className="container">
        <div className="crowdfunding-single">
          <div className="row">
            <div className="col-12 crowdfunding-single__top">
              <ActionbarLoader />
              <ActionbarLoader />
            </div>
            <main className="col-md-8 crowdfunding-single__main">
              <PostHeaderLoader type="crowdfunding" />
            </main>
            <aside className="col-md-4 crowdfunding-single__sidebar">
              <SidebarLoader className="full-width" type="popular" />
            </aside>
          </div>
        </div>
      </div>
    );
  }

  const status = getCFStatus(storedPost);

  const {
    cfACF: { collected, tocollect },
  } = storedPost;
  const collectedNumber = collected || 0;

  return (
    <div className="crowdfunding-single__container container">
      <Head>
        {/* TODO: change it */}
        <title>{storedPost.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="crowdfunding-single">
        <div className="row">
          <div className="col-12 crowdfunding-single__top">
            {status && (
              <ArticleStatus
                {...status}
                className="crowdfunding-single__status"
              />
            )}
            <h1 className="crowdfunding-single__title">{storedPost.title}</h1>
          </div>
          <main className="col-md-8 crowdfunding-single__main">
            <FeaturedImage
              className="crowdfunding-single__featured"
              data={storedPost.featuredImage}
            />
            <div className="crowdfunding-single__content">
              <div className="crowdfunding-single__title-mobile">
                {status && (
                  <ArticleStatus
                    {...status}
                    className="crowdfunding-single__status"
                  />
                )}
                <h1 className="crowdfunding-single__title">
                  {storedPost.title}
                </h1>
              </div>
              <div className="crowdfunding-single__about-wrapper title__socials-about">
                <div className="crowdfunding-single__about title__socials-about">
                  <Avatar
                    avatar={storedPost.author.avatar}
                    className="crowdfunding-single__author-avatar"
                  />

                  <div className="crowdfunding-single__author-about title__socials-author">
                    <ArticleAuthor
                      author={storedPost.author}
                      className="crowdfunding-single__author-name title__socials-name"
                    />
                    <ArticleDate
                      format={'DD MMMM, HH:mm'}
                      date={storedPost.date}
                    />
                  </div>
                </div>
              </div>
              <div className="crowdfunding-single__sidebar-mobile">
                <div className="crowdfunding-single__goal">
                  <span>ціль</span>{' '}
                  <NumberFormat
                    value={tocollect}
                    displayType={'text'}
                    thousandSeparator={' '}
                    suffix="ГРН"
                  />
                </div>
                <CrowdfundingProgress
                  className="crowdfunding-single__progress"
                  post={storedPost}
                />
                <CrowdfundingStats
                  post={storedPost}
                  className="crowdfunding-single__stats"
                />
                {(status.value === 'active' || status.value === 'finished') && (
                  <CrowdfundingActions
                    post={storedPost}
                    className="crowdfunding-single__actions"
                  />
                )}
                <CrowdfundingSupported
                  post={storedPost}
                  className="crowdfunding-single__actions"
                />
              </div>
              <Content
                content={storedPost.blocks}
                className="crowdfunding-single__block"
              />
            </div>
          </main>

          <aside className="col-md-4 crowdfunding-single__sidebar">
            <StickyBox offsetTop={70} offsetBottom={20}>
              <div className="crowdfunding-single__sidebar-wrapper">
                <div className="crowdfunding-single__goal">
                  <span>ціль</span>{' '}
                  <NumberFormat
                    value={tocollect}
                    displayType={'text'}
                    thousandSeparator={' '}
                    suffix="ГРН"
                  />
                </div>
                <CrowdfundingProgress
                  className="crowdfunding-single__progress"
                  post={storedPost}
                />
                <CrowdfundingStats
                  post={storedPost}
                  className="crowdfunding-single__stats"
                />
                {(status.value === 'active' || status.value === 'finished') && (
                  <CrowdfundingActions
                    post={storedPost}
                    className="crowdfunding-single__actions"
                  />
                )}
                <CrowdfundingSupported
                  post={storedPost}
                  className="crowdfunding-single__actions"
                />
              </div>
            </StickyBox>
          </aside>
        </div>
      </div>
    </div>
  );
};

Crowdfunding.propTypes = {
  crowdfunding: PropTypes.object,
};

Crowdfunding.getInitialProps = async ({ query: { slug } }) => {
  if (process.browser) {
    return { slug };
  }

  const { data } = await apolloClient.query({
    query: CROWDFUNDING,
    variables: { slug },
  });

  return {
    post: data.crowdfundingBy,
  };
};

export default Crowdfunding;
