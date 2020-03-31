import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';

const VIDEOS_ARCHIVE = gql`
  query VideosArchive {
    videos {
      nodes {
        excerpt
        title
        slug
      }
    }
  }
`;

const VideosArchive = (props) => {
  const { videos } = props;
  return (
    <div className="videos-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {videos.map((event, i) => (
          <article key={i}>
            <Link href="/videos/[slug]" as={`/videos/${event.slug}`}>
              <a>
                <h3>{event.title}</h3>
              </a>
            </Link>
            <div>{event.excerpt}</div>
          </article>
        ))}
      </main>
    </div>
  );
};

VideosArchive.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      excerpt: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

VideosArchive.getInitialProps = async () => {
  const { data } = await apolloClient.query({
    query: VIDEOS_ARCHIVE,
  });

  return {
    videos: data.videos.nodes,
  };
};

export default VideosArchive;
