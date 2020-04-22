import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import apolloClient from '~/lib/ApolloClient';
import BlogsLoader from '~/components/Loaders/BlogsLoader';

const OPPORTUNITIES_ARCHIVE = gql`
  query OpportunitiesArchive($cursor: String) {
    opportunities(first: 3, before: $cursor) {
      nodes {
        featuredImage {
          sourceUrl(size: THUMBNAIL)
        }
        excerpt
        title
        slug
        id
      }
      pageInfo {
        endCursor
        total
      }
    }
  }
`;

const OpportunitiesArchive = (props) => {
  const { fetchingContent, state } = useLoadMoreHook(
    OPPORTUNITIES_ARCHIVE,
    props,
    'opportunities'
  );

  if (!state.data.nodes)
    return (
      <div style={{ margin: '0 auto' }}>
        <BlogsLoader />
        <BlogsLoader />
      </div>
    );

  const { nodes, pageInfo } = state.data;

  return (
    <div className="opportunities-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div class="container">
          {nodes.map((opportunity, i) => (
            <article className="opportunity__card" key={i}>
              <img
                src={opportunity.featuredImage.sourceUrl}
                alt={opportunity.title}
              />
              <Link
                href="/opportunities/[slug]"
                as={`/opportunities/${opportunity.slug}`}
              >
                <a>
                  <h3>{opportunity.title}</h3>
                </a>
              </Link>
              <div>{opportunity.excerpt}</div>
              {i === nodes.length - 1 && i < pageInfo.total - 1 && (
                <Waypoint onEnter={fetchingContent} />
              )}
            </article>
          ))}
        </div>
        {state.isLoading && <BlogsLoader />}
      </main>
    </div>
  );
};

OpportunitiesArchive.propTypes = {
  opportunities: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      excerpt: PropTypes.string,
      slug: PropTypes.string,
      cursor: PropTypes.string,
    })
  ),
};

OpportunitiesArchive.getInitialProps = async () => {
  const { data } = await apolloClient.query({
    query: OPPORTUNITIES_ARCHIVE,
    variables: {
      cursor: null,
    },
  });

  const { opportunities } = data;

  return opportunities;
};

export default OpportunitiesArchive;
