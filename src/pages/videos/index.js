import React, { Component } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
// import Link from 'next/link';
import PropTypes from 'prop-types';

import VideosList from '~/components/VideosList';
import VideoTags from '~/components/VideoTags';
import apolloClient from '~/lib/ApolloClient';
import formatYouTubeUrl from '~/util/formatYouTubeUrl';
import convertISO8601ToTime from '~/util/convertISO8601ToTime';
import Play from '~/static/images/play';
import youtube from '~/apis/youtube';

const KEY = 'AIzaSyBz7hBEUeLfjjkbutilOakeLZv5hCDf-GM';

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
    tags {
      nodes {
        name
        videos {
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
    };
  }

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
    const { videos, tags } = this.props;
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
              <div className="col-8">
                <div className="pos-relative">
                  <iframe
                    allowFullScreen
                    className="w-100 video-detail__iframe"
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
              </div>
              <div className="col-4">
                <VideosList
                  videos={videos}
                  onVideoSelect={this.onVideoSelect}
                  selectedIndex={this.state.selectedIndex}
                />
              </div>
              <div className="col-12">
                <div className="video-detail__duration">{duration}</div>
                <h1 className="video-detail__title">{title}</h1>
              </div>
            </div>
          </div>
          <VideoTags tags={tags} />
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
  tags: PropTypes.array,
};

VideosArchive.getInitialProps = async () => {
  const { data } = await apolloClient.query({
    query: VIDEOS_ARCHIVE,
  });

  // Create array with unique video ids
  const videoIds = Array.from(
    new Set(
      data.videos.nodes.map((node) => {
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

  // Add duration for videos
  const tags = data.tags.nodes.map((node) => {
    const videoNodes = node.videos.nodes.map((videoNode) => {
      const { zmVideoACF } = videoNode;
      const videoId = zmVideoACF.videoUrl.split('?v=')[1];
      return {
        ...videoNode,
        zmVideoACF: {
          ...zmVideoACF,
          duration: videoDurations[videoId],
        },
      };
    });
    return {
      ...node,
      videos: {
        nodes: [...videoNodes],
      },
    };
  });

  return {
    videos,
    tags,
  };
};

export default VideosArchive;
