import React, { Component, createRef } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

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

class VideosArchive extends Component {
  constructor(props) {
    super(props);
    const { title, zmVideoACF } = this.props.videos[0];
    const { videoUrl, videoCover, duration } = zmVideoACF;
    this.state = {
      selectedVideo: {
        url: formatYouTubeUrl(videoUrl),
        imageUrl: videoCover.mediaItemUrl,
        duration,
        title,
      },
      selectedIndex: 0,
      isPlaying: false,
      categories: this.props.categories,
      isLoading: false,
      endCursor: this.props.endCursor,
      hasNextPage: this.props.hasNextPage,
    };

    this.categoriesRef = createRef();
  }

  componentDidMount() {
    if (this.state.hasNextPage) {
      window.addEventListener('scroll', this.onScroll);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const { offsetTop, offsetHeight } = this.categoriesRef.current;
    if (offsetTop + offsetHeight >= window.scrollY) {
      this.onLoadMore();
    }
  };

  onLoadMore = async () => {
    const { isLoading, categories, endCursor, hasNextPage } = this.state;
    if (!isLoading && hasNextPage) {
      this.setState({
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
        this.props.videoDurations
      );

      this.setState({
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

  // handleLoadMore = () => {
  //   this.onLoadMore();
  // };

  onVideoSelect = (url, imageUrl, title, duration, index) => {
    this.setState({
      selectedVideo: {
        url: formatYouTubeUrl(url),
        imageUrl,
        title,
        duration,
      },
    });
    this.setState({
      selectedIndex: index,
      isPlaying: true,
    });
  };

  onClick = () => {
    this.setState({ isPlaying: !this.state.isPlaying });
  };

  render() {
    const { isLoading } = this.state;
    const { videos } = this.props;
    const { isPlaying } = this.state;
    const { url, imageUrl, title, duration } = this.state.selectedVideo;
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
                    src={`${url}${isPlaying ? '?autoplay=1' : ''}`}
                    frameBorder="0"
                    title="video player"
                  />
                  {!isPlaying && (
                    <div
                      onClick={this.onClick}
                      className="video-detail__cover bg-cover"
                      style={{
                        backgroundImage: `url(${imageUrl})`,
                      }}
                    >
                      <Play />
                    </div>
                  )}
                </div>
                <div className="d-block d-lg-none">
                  <div className="video-detail__duration tx-tiny font-weight-medium tx-family-titles">
                    {duration}
                  </div>
                  <h1 className="video-detail__title">{title}</h1>
                </div>
              </div>
              <div className="col-lg-4">
                <VideosList
                  videos={videos}
                  onVideoSelect={this.onVideoSelect}
                  selectedIndex={this.state.selectedIndex}
                />
              </div>
              <div className="col-12 d-none d-lg-block">
                <div className="video-detail__duration tx-tiny font-weight-medium tx-family-titles">
                  {duration}
                </div>
                <h1 className="video-detail__title">{title}</h1>
              </div>
            </div>
          </div>
          <div ref={this.categoriesRef}>
            <VideoCategories categories={this.state.categories} />
            {isLoading && <VideoLoader />}
          </div>
        </main>
      </div>
    );
  }
}

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

VideosArchive.getInitialProps = async () => {
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
