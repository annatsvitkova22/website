import React, { useRef, useState } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import StickyBox from 'react-sticky-box';

import apolloClient from '~/lib/ApolloClient';
import gutenbergBlocksQuery from '~/lib/GraphQL/gutenbergBlocksQuery';
import Share from '~/components/Share';
import Content from '~/components/Content';
import SideBarNews from '~/components/SideBarNews';

const BLOG = gql`
  query Blog($slug: String!) {
    blogBy(slug: $slug) {
      ${gutenbergBlocksQuery}
      content
      title
    }
  }
`;
const BLOGS = gql`
  query Blogs($cursor: String) {
    blogs(first: 5, before: $cursor) {
      pageInfo {
        endCursor
        total
      }
      nodes {
        link
        title
        author {
          lastName
          firstName
        }
      }
    }
  }
`;

const Blog = ({ blog, allBlogs }) => {
  const ref = useRef();

  const [state, setState] = useState({
    updBlogs: allBlogs,
    isLoading: false,
    endCursor: allBlogs.pageInfo.endCursor ? allBlogs.pageInfo.endCursor : null,
  });

  const fetchingContent = async () => {
    if (!state.isLoading) {
      setState({
        ...state,
        isLoading: true,
      });
    }

    const blogsData = await apolloClient.query({
      query: BLOGS,
      variables: {
        cursor: state.endCursor,
      },
    });

    setState({
      isLoading: false,
      endCursor: blogsData.data.blogs.pageInfo
        ? blogsData.data.blogs.pageInfo.endCursor
        : false,
      updBlogs: {
        pageInfo: blogsData.data.blogs.pageInfo,
        nodes: [...state.updBlogs.nodes, ...blogsData.data.blogs.nodes],
      },
    });
  };

  if (!blog) return <div>lodaing...</div>;

  return (
    <div className="single-news">
      <Head>
        <title>{blog.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{blog.title}</h1>
        <section
          className={'main row no-gutters justify-content-between'}
          style={{ display: 'flex', alignItems: 'flex-start' }}
        >
          <StickyBox
            offsetTop={20}
            offsetBottom={20}
            className={'side-bar__wrapper col-1'}
          >
            <Share />
          </StickyBox>
          <section className={'description col-7'}>
            <Content content={blog.blocks} />
          </section>
          <StickyBox
            offsetTop={20}
            offsetBottom={20}
            className={'side-bar__wrapper col-3'}
          >
            <section className={'latest'}>
              <SideBarNews
                news={state.updBlogs}
                ref={ref}
                fetchingContent={fetchingContent}
                isLoading={state.isLoading}
              />
            </section>
          </StickyBox>
        </section>
        <div className="description">{blog.content}</div>
      </main>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  allBlogs: PropTypes.object,
};

Blog.getInitialProps = async ({ query: { slug } }) => {
  const { data } = await apolloClient.query({
    query: BLOG,
    variables: { slug },
  });

  const blogs = await apolloClient.query({
    query: BLOGS,
    variables: {
      cursor: null,
    },
  });
  return {
    blog: data.blogBy,
    allBlogs: blogs.data.blogs,
  };
};

export default Blog;
