import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';

const BLOG = gql`
  query Blog($slug: String!) {
    blogBy(slug: $slug) {
      content
      title
    }
  }
`;

const Blog = (props) => {
  const { blog } = props;
  return (
    <div className="single-news">
      <Head>
        <title>{blog.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{blog.title}</h1>

        <div className="description">{blog.content}</div>
      </main>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
};

Blog.getInitialProps = async ({ query: { slug } }) => {
  const { data } = await apolloClient.query({
    query: BLOG,
    variables: { slug },
  });

  return {
    blog: data.blogBy,
  };
};

export default Blog;
