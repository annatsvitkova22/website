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
import Tags from '~/components/Tags';
import NewsFooter from '~/components/NewsFooter';
import Content from '~/components/Content';

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
  }
`;

const Post = (props) => {
  const { post } = props;
  console.log(post);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="single-news">
        <NewsHead post={post} />
        <section
          className={'main row'}
          style={{ display: 'flex', alignItems: 'flex-start' }}
        >
          <StickyBox offsetTop={20} offsetBottom={20} className={'col-1'}>
            <Share />
          </StickyBox>
          <div className={'description col-7'}>
            <Content content={post.blocks} />
          </div>
          <StickyBox offsetTop={20} offsetBottom={20} className={'col-3'}>
            <div className={'latest'}>Latest News</div>
          </StickyBox>
        </section>
        <NewsFooter post={post} />
      </main>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object,
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
