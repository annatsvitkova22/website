import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';

import apolloClient from '~/lib/ApolloClient';

const NEWS = gql`
  query News($slug: String!) {
    postBy(slug: $slug) {
      title
      content
    }
  }
`;

const Post = (props) => {
  const { post } = props;
  return (
    <div className="single-news">
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{post.title}</h1>

        <div className="description">{post.content}</div>
      </main>
    </div>
  );
};

Post.getInitialProps = async ({ query: { slug } }) => {
  const { data } = await apolloClient.query({
    query: NEWS,
    variables: { slug },
  });

  return {
    post: data.postBy,
  };
};

export default Post;
