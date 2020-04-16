/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import 'moment/locale/uk';
import Link from 'next/link';

import PhotoSwipeGallery from '~/components/PhotoSwipeGallery';
import {
  getThumbnailVideo,
  prepareGalleryItems,
  options,
} from '~/components/PhotoSwipeGallery/videoGalleryUtils';
import apolloClient from '~/lib/ApolloClient';
import convertISO8601ToTime from '~/util/convertISO8601ToTime';
import youtube from '~/apis/youtube';

const KEY = 'AIzaSyBz7hBEUeLfjjkbutilOakeLZv5hCDf-GM';

const CATEGORY_ID = gql`
  query CategoryId($slug: [String]) {
    categories(where: { slug: $slug }) {
      nodes {
        name
        categoryId
      }
    }
  }
`;

const VIDEOS = gql`
  query Videos($categoryId: Int) {
    videos(where: { categoryId: $categoryId }) {
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

const CATEGORIES = gql`
  query Categories {
    categories(where: { hideEmpty: true }) {
      nodes {
        name
        slug
        categoryId
      }
    }
  }
`;

class Category extends Component {
  render() {
    const { categoryName, currCatId, videos, categories } = this.props;

    return (
      <div className="videos-page">
        <Head>
          {/* TODO: change title */}
          <title>{'Відео'}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="videos-main">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1 className="text-uppercase">{categoryName}</h1>
              </div>
              <div className="col-12">
                <ul className="list-unstyled d-flex cat-list">
                  {categories.map((category) => {
                    const { categoryId, slug, name } = category;
                    return (
                      <li className="cat-list__item" key={categoryId}>
                        <Link href={slug}>
                          <a
                            className={`cat-list__button ${
                              currCatId === categoryId
                                ? 'cat-list__button--active'
                                : ''
                            }`}
                          >
                            {name}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <PhotoSwipeGallery
                className="col-12 video-cat-gall"
                items={prepareGalleryItems(videos, 10)}
                options={options()}
                thumbnailContent={getThumbnailVideo}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

Category.propTypes = {
  categoryName: PropTypes.string,
  currCatId: PropTypes.number,
  videos: PropTypes.array,
  categories: PropTypes.array,
};

Category.getInitialProps = async ({ query: { slug } }) => {
  const categoryData = await apolloClient.query({
    query: CATEGORY_ID,
    variables: { slug },
  });
  const { categoryId, name } = categoryData.data.categories.nodes[0];

  const videosData = await apolloClient.query({
    query: VIDEOS,
    variables: { categoryId },
  });

  const categories = await apolloClient.query({
    query: CATEGORIES,
  });

  // Create array with unique video ids
  const videoIds = Array.from(
    new Set(
      videosData.data.videos.nodes.map((node) => {
        const { videoUrl } = node.zmVideoACF;
        const videoId = videoUrl.split('?v=')[1];
        return videoId;
      })
    )
  );

  const response = await youtube.get('/videos', {
    params: {
      id: videoIds.join(','),
      part: 'contentDetails',
      key: KEY,
    },
  });

  // Create object with video durations and id as a key
  const videoDurations = response.data.items.reduce((acc, item) => {
    acc[item.id] = convertISO8601ToTime(item.contentDetails.duration);
    return acc;
  }, {});

  // Add duration for videos
  const formattedVideos = videosData.data.videos.nodes.map((node) => {
    const { zmVideoACF } = node;
    const videoId = zmVideoACF.videoUrl.split('?v=')[1];
    return {
      ...node,
      zmVideoACF: {
        ...zmVideoACF,
        duration: videoDurations[videoId],
      },
    };
  });

  return {
    categories: categories.data.categories.nodes,
    categoryName: name,
    currCatId: categoryId,
    videos: formattedVideos,
  };
};

export default Category;
