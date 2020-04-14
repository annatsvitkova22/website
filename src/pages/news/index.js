import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useQuery, watchQuery } from '@apollo/react-hooks';

import apolloClient from '~/lib/ApolloClient';

const NEWS_ARCHIVE = gql`
  query NewsArchive($last: Int, $after: String) {
    posts(last: $last, after: $after) {
      edges {
        cursor
      }
      nodes {
        id
        excerpt
        title
        slug
      }
    }
  }
`;

const News = (props) => {
  const query = watchQuery(NEWS_ARCHIVE, {
    variables: {
      last: 3,
      after: null,
    },
  });


  console.log(data);

  const { posts } = props;
  return (
    <div className="news-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {posts.map((post) => (
          <article key={post.id}>
            <Link href="/news/[slug]" as={`/news/${post.slug}`}>
              <a href={`/news/${post.slug}`}>
                <h3>{post.title}</h3>
              </a>
            </Link>
            <div>{post.excerpt}</div>
          </article>
        ))}
      </main>
    </div>
  );
};

News.propTypes = {
  posts: PropTypes.array,
};

News.getInitialProps = async () => {
  const { data } = await apolloClient.query({
    query: NEWS_ARCHIVE,
    variables: { last: 3, after: null },
  });

  return {
    posts: data.posts.nodes,
  };
};

export default News;
