import React, { Component } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
// import Link from 'next/link';
import PropTypes from 'prop-types';

import VideosList from '~/components/VideosList';
import apolloClient from '~/lib/ApolloClient';
import formatYouTubeUrl from '~/util/formatYouTubeUrl';

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
  }
`;

class VideosArchive extends Component {
  constructor(props) {
    super(props);
    const { title, zmVideoACF } = this.props.videos[0];
    this.state = {
      selectedVideo: {
        url: formatYouTubeUrl(zmVideoACF.videoUrl),
        title,
      },
    };
  }

  onVideoSelect = (url, title) => {
    this.setState({
      selectedVideo: {
        url: formatYouTubeUrl(url),
        title,
      },
    });
  };

  render() {
    const { videos } = this.props;
    return (
      <div className="videos-page">
        <Head>
          {/* TODO: change title */}
          <title>{'Відео'}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <div className="wrapper">
            <div className="row">
              <div className="col-xs-8">
                <iframe
                  src={this.state.selectedVideo.url}
                  frameBorder="0"
                  title="video player"
                />
                <h1 className="title">{this.state.selectedVideo.title}</h1>
              </div>
              <div className="col-xs-4">
                <VideosList
                  videos={videos}
                  onVideoSelect={this.onVideoSelect}
                />
              </div>
            </div>
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
};

VideosArchive.getInitialProps = async () => {
  const { data } = await apolloClient.query({
    query: VIDEOS_ARCHIVE,
  });

  return {
    videos: data.videos.nodes,
  };
};

export default VideosArchive;
