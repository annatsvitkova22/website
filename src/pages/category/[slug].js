/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/uk';
import Link from 'next/link';

import PhotoSwipeGallery from '~/components/VideoCategories/PhotoSwipeGallery';
import apolloClient from '~/lib/ApolloClient';
import formatYouTubeUrl from '~/util/formatYouTubeUrl';
import convertISO8601ToTime from '~/util/convertISO8601ToTime';
import Play from '~/static/images/play';
import youtube from '~/apis/youtube';
import share from '~/static/images/share';
import facebook from '~/static/images/facebook-f';
import telegram from '~/static/images/telegram-plane';

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

class VideosArchive extends Component {
  getThumbnailContent(item) {
    return (
      <>
        <div
          className="video-category__thumbnail bg-cover pos-relative"
          style={{ backgroundImage: `url(${item.thumbnail})` }}
        >
          <Play />
        </div>
        <p className="video-category__duration">{item.duration}</p>
        <h4 className="video-category__name">{item.name}</h4>
      </>
    );
  }

  render() {
    const { categoryName, currCatId, videos, categories } = this.props;

    const options = {
      shareEl: false,
      galleryUID: 1,
      bgOpacity: 0.75,
    };

    const videoItems = videos.map((video) => {
      const { zmVideoACF, title, excerpt, date } = video;
      const { videoUrl, videoCover, duration } = zmVideoACF;
      const pubDate = new Date(date);
      return {
        html: `
            <div class="video-category__iframe">
              <iframe src="${formatYouTubeUrl(
                videoUrl
              )}" frameborder="0"></iframe>
              <div class="video-category__info tx-white">
                <h3>${title}</h3>
                <div>${excerpt}</div>
                <div class="row">
                  <div class="col-6">
                    <div>${moment(pubDate).format('DD MMMM YYYY HH:mm')}</div>
                  </div>
                  <div class="col-6">
                    <ul class="list-unstyled d-flex justify-content-end">
                      <li>${share}</li>
                      <li>${facebook}</li>
                      <li>${telegram}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            `,
        thumbnail: videoCover.mediaItemUrl,
        name: title,
        duration,
      };
    });

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
                <h1>{categoryName}</h1>
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
                className="col-12"
                items={videoItems}
                options={options}
                thumbnailContent={this.getThumbnailContent}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

VideosArchive.getInitialProps = async ({ query: { slug } }) => {
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

export default VideosArchive;
