import React from 'react';
import StickyBox from 'react-sticky-box';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import '../../styles/pages/singleNews.scss';
import gutenbergBlocksQuery from '~/lib/GraphQL/gutenbergBlocksQuery';
import apolloClient from '~/lib/ApolloClient';
import NewsHead from '~/components/NewsHead';
import Share from '~/components/Share';
import NewsFooter from '~/components/NewsFooter';
import Content from '~/components/Content';
import SideBarNews from '~/components/SideBarNews';
import PostHeaderLoader from '~/components/Loaders/PostHeaderLoader';

const NEWS = gql`
  query News($slug: String!) {
    postBy(slug: $slug) {
      ${gutenbergBlocksQuery}
      title
      content
      date
      excerpt
      categories {
        nodes {
          id
          name
          link
        }
      }
      tags {
        nodes {
          id
          name
          link
        }
      }
      comments {
        pageInfo {
          total
        }
      }
      author {
        lastName
        firstName
      }
      featuredImage {
        id
        mediaItemUrl
        caption
        title
        author {
          name
          description
        }
      }
    }
    posts {
      nodes {
        title
        link
        date
      }
    }
  }
`;

const Post = ({ post, news }) => {
  const ref = React.useRef();
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="single-news">
        {post ? (
          <>
            <NewsHead post={post} />
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
                <Content content={post.blocks} />
              </section>
              <StickyBox
                offsetTop={20}
                offsetBottom={20}
                className={'side-bar__wrapper col-3'}
              >
                <section className={'latest'}>
                  <SideBarNews news={news.nodes} ref={ref} />
                </section>
              </StickyBox>
            </section>
            <NewsFooter post={post} />
          </>
        ) : (
          <PostHeaderLoader />
        )}
      </main>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  news: PropTypes.object,
};

Post.getInitialProps = async ({ query: { slug } }) => {
  const { data } = await apolloClient.query({
    query: NEWS,
    variables: { slug },
  });

  return {
    post: data.postBy,
    news: data.posts,
  };
};

export default Post;
