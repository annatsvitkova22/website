import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

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

const CROWDFUNDING = gql`
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
        }
      }
    }
  }
`;

const Crowdfunding = (props) => {
  const [state, setState] = useState({
    post: props.post,
  });

  const { post, isLoading } = state;

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

  if (!post) {
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

  useViewsCounter(post);

  const status = getCFStatus(post);

  const {
    cfACF: { collected },
  } = post;
  const collectedNumber = collected ? collected : 0;

  return (
    <div className="container">
      <Head>
        {/* TODO: change it */}
        <title>{post.title}</title>
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
            <h1 className="crowdfunding-single__title">{post.title}</h1>
          </div>
          <main className="col-md-8 crowdfunding-single__main">
            <FeaturedImage
              className="crowdfunding-single__featured"
              data={post.featuredImage}
            />
            <div className={'title__socials'}>
              <div className={'title__socials-about'}>
                <span className="title__socials-image" />
                <div className={'title__socials-author'}>
                  <ArticleAuthor
                    author={post.author}
                    className={'title__socials-name'}
                  />
                  <ArticleDate format={'DD MMMM, HH:mm'} date={post.date} />
                </div>
              </div>
            </div>
            <Content content={post.blocks} />
          </main>
          <aside className="col-md-4 crowdfunding-single__sidebar">
            <div className="crowdfunding-single__goal">
              <NumberFormat
                value={collectedNumber}
                displayType={'text'}
                thousandSeparator={' '}
                suffix="ГРН"
              />
            </div>
            <CrowdfundingProgress
              className="crowdfunding-single__progress"
              post={post}
            />
            <CrowdfundingStats
              post={post}
              className="crowdfunding-single__stats"
            />
            {(status.value === 'active' || status.value === 'finished') && (
              <CrowdfundingActions
                post={post}
                className="crowdfunding-single__actions"
              />
            )}
            <CrowdfundingSupported
              post={post}
              className="crowdfunding-single__actions"
            />
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
