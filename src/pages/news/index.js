import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';

import apolloClient from '~/lib/ApolloClient';

const NEWS_ARCHIVE = gql`
  query NewsArchive {
    posts {
      nodes {
        excerpt
        title
        slug
      }
    }
  }
`;

const NewsArchive = (props) => {
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
          <article>
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

NewsArchive.getInitialProps = async () => {
  const { data } = await apolloClient.query({
    query: NEWS_ARCHIVE,
  });

  return {
    posts: data.posts.nodes,
  };
};

export default NewsArchive;
