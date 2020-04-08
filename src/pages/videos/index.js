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
    this.state = {
      selectedVideo: {
        url: formatYouTubeUrl(zmVideoACF.videoUrl),
        imageUrl: zmVideoACF.videoCover.mediaItemUrl,
        title,
      },
      selectedIndex: 0,
      isPlaying: false,
    };
  }

  onVideoSelect = (url, imageUrl, title, index) => {
    this.setState({
      selectedVideo: {
        url: formatYouTubeUrl(url),
        imageUrl,
        title,
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
    const { url, imageUrl, title } = this.state.selectedVideo;
    return (
      <div className="videos-page">
        <Head>
          {/* TODO: change title */}
          <title>{'Відео'}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
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
                <h1 className="title">{title}</h1>
              </div>
              <div className="col-4">
                <VideosList
                  videos={videos}
                  onVideoSelect={this.onVideoSelect}
                  selectedIndex={this.state.selectedIndex}
                />
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

  const response = await youtube.get('/videos', {
    params: {
      id: 'hvG6oJCf2Fg, 8bCwZ-XpzUw',
      part: 'contentDetails',
      key: KEY,
    },
  });
  const duration = response.data.items.map((item) =>
    convertISO8601ToTime(item.contentDetails.duration)
  );

  return {
    videos: data.videos.nodes,
    tags: data.tags.nodes,
    formattedVideos: '',
  };
};

export default VideosArchive;
