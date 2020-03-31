import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';

const BLOG_ARCHIVE = gql`
  query BlogArchive {
    blogs {
      nodes {
        excerpt
        title
        slug
      }
    }
  }
`;

const BlogArchive = (props) => {
  const { blogs } = props;
  return (
    <div className="news-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {blogs.map((blog, i) => (
          <article key={i}>
            <Link href="/blogs/[slug]" as={`/blogs/${blog.slug}`}>
              <a>
                <h3>{blog.title}</h3>
              </a>
            </Link>
            <div>{blog.excerpt}</div>
          </article>
        ))}
      </main>
    </div>
  );
};

BlogArchive.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      excerpt: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

BlogArchive.getInitialProps = async () => {
  const { data } = await apolloClient.query({
    query: BLOG_ARCHIVE,
  });

  return {
    blogs: data.blogs.nodes,
  };
};

export default BlogArchive;
