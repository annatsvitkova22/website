import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import apolloClient from '~/lib/ApolloClient';
import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import NewsLoader from '~/components/Loaders/NewsLoader';
import BlogsLoader from '~/components/Loaders/BlogsLoader';

const OTHERS_ARCHIVE = gql`
  query OthersArchive {
    others {
      nodes {
        excerpt
        title
        slug
      }
      pageInfo {
        endCursor
        total
      }
    }
  }
`;

const OthersArchive = (props) => {
  const { fetchingContent, state } = useLoadMoreHook(
    OTHERS_ARCHIVE,
    props,
    'other'
  );

  if (!state.data.nodes)
    return (
      <div>
        <NewsLoader />
        <NewsLoader />
      </div>
    );

  const { nodes, pageInfo } = state.data;
  return (
    <div className="others-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          {nodes.map((other, i) => (
            <article key={i}>
              <Link href="/others/[slug]" as={`/others/${other.slug}`}>
                <a>
                  <h3>{other.title}</h3>
                </a>
              </Link>
              <div>{other.excerpt}</div>
              {i === nodes.length - 1 && i < pageInfo.total && (
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

OthersArchive.propTypes = {
  others: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      excerpt: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

OthersArchive.getInitialProps = async () => {
  if (process.browser) {
    return {};
  }
  const { data } = await apolloClient.query({
    query: OTHERS_ARCHIVE,
    variables: {
      cursor: null,
    },
  });

  const { others } = data;
  return others;
};

export default OthersArchive;
