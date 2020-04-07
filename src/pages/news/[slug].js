import React from 'react';
import StickyBox from 'react-sticky-box';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';
import NewsHead from '~/components/NewsHead';
import SharePopUp from '~/components/SharePopUp';

const NEWS = gql`
  query News($slug: String!) {
    postBy(slug: $slug) {
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
  const [isVisible, setIsVisible] = React.useState(false);

  const changeVisibility = () => {
    setIsVisible(() => {
      return !isVisible;
    });
  };

  return (
    <div className="single-news">
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NewsHead post={post} />
        <section
          className={'main row'}
          style={{ display: 'flex', alignItems: 'flex-start' }}
        >
          <StickyBox offsetTop={20} offsetBottom={20} className={'col-1'}>
            <div>
              <button onClick={changeVisibility}>Share</button>
              <SharePopUp isVisible={isVisible} />
              <span>Like</span>
            </div>
          </StickyBox>
          <div
            className={'description col-7'}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <StickyBox offsetTop={20} offsetBottom={20} className={'col-3'}>
            <div className={'latest'}>Latest News</div>
          </StickyBox>
        </section>
      </main>
    </div>
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
