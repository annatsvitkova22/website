import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Link from 'next/link';

import client from '~/lib/ApolloClient';
import gutenbergBlocksQuery from '~/lib/GraphQL/gutenbergBlocksQuery';
import Content from '~/components/Content';
import PhotoSwipeGallery from '~/components/PhotoSwipeGallery';
import {
  getThumbnailVideo,
  prepareGalleryItems,
  options,
} from '~/components/PhotoSwipeGallery/videoGalleryUtils';
import addVideoDurations from '~/util/addVideoDurations';

// TODO: restore, create custom GraphQL resolver
// homepage {
//   id
//   title
//   content
// }

const HOME_PAGE = gql`
  query PageQuery {
    pages(where: { title: "Головна" }) {
      nodes {
        title
        ${gutenbergBlocksQuery}
      }
    }
    videos(first: 8) {
      nodes {
        title
        excerpt
        date
        zmVideoACF {
          videoCover {
            mediaItemUrl
          }
          videoUrl
        }
      }
    }
  }
`;

const Home = (props) => {
  const { page } = props;
  return (
    <div className="home-page">
      <Head>
        <title>{page.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{page.title}</h1>
        <Content content={page.blocks} />

        <div className="container">
          <div className="row line-height-1 video-category__top-row">
            <div className="col-6">
              <h6 className="video-category__title text-uppercase tx-family-alt">
                Відео
              </h6>
            </div>
            <div className="col-6 text-right tx-green">
              <Link
                href={`/videos`}
                // as={`/videos/category/${category.slug}`}
              >
                <a className="video-category__watch-all tx-family-titles font-weight-semibold">
                  Дивись Усі
                </a>
              </Link>
            </div>
          </div>
          <div className="row">
            <PhotoSwipeGallery
              className="col-12 video-cat-gall"
              items={prepareGalleryItems(props.videos)}
              options={options()}
              thumbnailContent={getThumbnailVideo}
              playClass="tx-white"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

Home.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
};

Home.getInitialProps = async () => {
  const result = await client.query({
    query: HOME_PAGE,
  });

  return {
    page: result.data.pages.nodes[0],
    // TODO: Put bellow function on frontend
    videos: await addVideoDurations(result.data.videos.nodes),
  };
};

export default Home;
