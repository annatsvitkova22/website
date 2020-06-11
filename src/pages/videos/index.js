import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';


import VideosList from '~/components/VideosList';
import VideoCategories from '~/components/VideoCategories';
import apolloClient from '~/lib/ApolloClient';
import {
  formatYouTubeUrl,
  getDurations,
  addCategoryVideosDurations,
} from '~/util';
import Play from '~/static/images/play';
import VideoLoader from '~/components/Loaders/VideoLoader';
import VideosPageLoader from '~/components/Loaders/VideosPageLoader';

const VIDEOS_ARCHIVE = gql`
  query VideosArchive {
    videos {
      nodes {
        excerpt
        title
        slug
        zmVideoACF {
          videoUrl
          videoCover {
            mediaItemUrl
            zm_xs_rect: sourceUrl(size: ZM_XS_RECT)
          }
        }
      }
    }
    categories(first: 3, where: { hideEmpty: true }) {
      nodes {
        name
        slug
        videos(first: 4) {
          nodes {
            title
            excerpt
            date
            zmVideoACF {
              videoUrl
              videoCover {
                mediaItemUrl
                zm_xs_rect: sourceUrl(size: ZM_XS_RECT)
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const VIDEOS_CATEGORIES = gql`
  query VideosCategories($first: Int, $endCursor: String) {
    categories(first: $first, after: $endCursor, where: { hideEmpty: true }) {
      nodes {
        name
        slug
        videos(first: 4) {
          nodes {
            title
            excerpt
            date
            zmVideoACF {
              videoUrl
              videoCover {
                mediaItemUrl
                zm_xs_rect: sourceUrl(size: ZM_XS_RECT)
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

// TODO: refactor whole component, combine 2 states into 1
const VideosArchive = (props) => {
  const categoriesRef = useRef(null);
  const [content, setContent] = useState(props);
  const [state, setState] = useState({});

  useEffect(() => {
    const loadContent = async () => {
      const { data } = await apolloClient.query({
        query: VIDEOS_ARCHIVE,
      });

      const videoDurations = await getDurations(data.videos.nodes);

      const videos = data.videos.nodes.map((node) => {
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

      const categories = addCategoryVideosDurations(
        data.categories.nodes,
        videoDurations
      );

      setContent({
        videoDurations,
        endCursor: data.categories.pageInfo.endCursor,
        hasNextPage: data.categories.pageInfo.hasNextPage,
        videos,
        categories,
      });

      const { title, zmVideoACF } = videos[0];
      const { videoUrl, videoCover, duration } = zmVideoACF;

      setState({
        ...state,
        selectedVideo: {
          url: formatYouTubeUrl(videoUrl),
          imageUrl: videoCover.mediaItemUrl,
          duration,
          title,
        },
        selectedIndex: 0,
        isPlaying: false,
        categories,
        isLoading: false,
        endCursor: data.categories.pageInfo.endCursor,
        hasNextPage: data.categories.pageInfo.hasNextPage,
      });
    };

    if (!content.videos) {
      loadContent();
    } else {
      const { title, zmVideoACF } = content.videos[0];
      const { videoUrl, videoCover, duration } = zmVideoACF;

      setState({
        selectedVideo: {
          url: formatYouTubeUrl(videoUrl),
          imageUrl: videoCover.mediaItemUrl,
          duration,
          title,
        },
        selectedIndex: 0,
        isPlaying: false,
        categories: content.categories,
        isLoading: false,
        endCursor: content.endCursor,
        hasNextPage: content.hasNextPage,
      });
    }
  }, []);

  const onLoadMore = async () => {
    const { isLoading, categories, endCursor, hasNextPage } = state;
    if (!isLoading && hasNextPage) {
      setState({
        ...state,
        isLoading: true,
      });

      const { data } = await apolloClient.query({
        query: VIDEOS_CATEGORIES,
        variables: {
          first: 1,
          endCursor,
        },
      });

      const formattedCategories = addCategoryVideosDurations(
        data.categories.nodes,
        content.videoDurations
      );

      setState({
        ...state,
        categories: [...categories, ...formattedCategories],
        endCursor: data.categories.pageInfo
          ? data.categories.pageInfo.endCursor
          : false,
        hasNextPage: data.categories.pageInfo
          ? data.categories.pageInfo.hasNextPage
          : false,
        isLoading: false,
      });
    }
  };

  const onVideoSelect = (url, imageUrl, title, duration, index) => {
    setState({
      ...state,
      selectedVideo: {
        url: formatYouTubeUrl(url),
        imageUrl,
        title,
        duration,
      },
      selectedIndex: index,
      isPlaying: true,
    });
  };

  const onClick = () => {
    setState({ ...state, isPlaying: !state.isPlaying });
  };

  const { videos } = content;

  if (!videos) {
    return (
      <div className="videos-page">
        <main className="videos-main">
          <div className="container">
            <div className="row">
              <div className="loader-container__desktop">
                <VideosPageLoader />
              </div>
              <div className="loader-container__mobile">
                <VideosPageLoader type={'mobile'} />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const {
    isLoading,
    isPlaying,
    selectedVideo,
    categories,
    selectedIndex,
    hasNextPage,
  } = state;

  return (
    <div className="videos-page">
      <Head>
        <title>ЗМІСТ - Відео</title>
      </Head>

      <main className="videos-main">
        <div className="container">
          {selectedVideo && (
            <div className="row">
              <div className="col-lg-8">
                <div className="pos-relative video-detail__wrapper">
                  <img
                    className="video-detail__sizer w-100 h-auto"
                    src="/assets/videos/video-sizer-detail.png"
                    alt="Video sizer"
                  />
                  <iframe
                    allowFullScreen
                    className="w-100 h-100 video-detail__iframe"
                    src={`${selectedVideo.url}${
                      isPlaying ? '?autoplay=1' : ''
                    }`}
                    frameBorder="0"
                    title="video player"
                  />
                  {!isPlaying && (
                    <div
                      onClick={onClick}
                      className="video-detail__cover bg-cover"
                      style={{
                        backgroundImage: `url(${selectedVideo.imageUrl})`,
                      }}
                    >
                      <Play />
                    </div>
                  )}
                </div>
                <div className="d-block d-lg-none">
                  <div className="video-detail__duration tx-tiny font-weight-medium tx-family-titles">
                    {selectedVideo.duration}
                  </div>
                  <h1 className="video-detail__title">{selectedVideo.title}</h1>
                </div>
              </div>
              <div className="col-lg-4">
                <VideosList
                  videos={videos}
                  onVideoSelect={onVideoSelect}
                  selectedIndex={selectedIndex}
                />
              </div>
              <div className="col-12 d-none d-lg-block">
                <div className="video-detail__duration tx-tiny font-weight-medium tx-family-titles">
                  {selectedVideo.duration}
                </div>
                <h1 className="video-detail__title">{selectedVideo.title}</h1>
              </div>
            </div>
          )}
        </div>
        <div ref={categoriesRef}>
          {categories && <VideoCategories categories={categories} />}
          {isLoading && <VideoLoader />}
        </div>
        {/* TODO: remove extra loader if there is no more content available */}
        {hasNextPage && <Waypoint onEnter={onLoadMore} />}
      </main>
    </div>
  );
};

VideosArchive.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      zmVideoACF: PropTypes.object,
    })
  ),
  endCursor: PropTypes.string,
  hasNextPage: PropTypes.bool,
  videoDurations: PropTypes.object,
  categories: PropTypes.array,
};

VideosArchive.getInitialProps = async ({ query }) => {
  if (process.browser) {
    return { query };
  }

  const { data } = await apolloClient.query({
    query: VIDEOS_ARCHIVE,
  });

  const videoDurations = await getDurations(data.videos.nodes);

  const videos = data.videos.nodes.map((node) => {
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

  const categories = addCategoryVideosDurations(
    data.categories.nodes,
    videoDurations
  );

  return {
    videoDurations,
    endCursor: data.categories.pageInfo.endCursor,
    hasNextPage: data.categories.pageInfo.hasNextPage,
    videos,
    categories,
  };
};

export default VideosArchive;
