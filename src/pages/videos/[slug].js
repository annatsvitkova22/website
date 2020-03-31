import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';

const VIDEO = gql`
  query Video($slug: String!) {
    videoBy(slug: $slug) {
      title
      content
    }
  }
`;

const Video = (props) => {
  const { video } = props;
  return (
    <div className="single-video">
      <Head>
        <title>{video.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{video.title}</h1>

        <div className="description">{video.content}</div>
      </main>
    </div>
  );
};

Video.propTypes = {
  video: PropTypes.object,
};

Video.getInitialProps = async ({ query: { slug } }) => {
  const { data } = await apolloClient.query({
    query: VIDEO,
    variables: { slug },
  });

  return {
    video: data.videoBy,
  };
};

export default Video;
