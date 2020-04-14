/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import Head from 'next/head';
// import gql from 'graphql-tag';
// import Link from 'next/link';
// import PropTypes from 'prop-types';

// import VideosList from '~/components/VideosList';
// import VideoCategories from '~/components/VideoCategories';
// import apolloClient from '~/lib/ApolloClient';
// import formatYouTubeUrl from '~/util/formatYouTubeUrl';
// import convertISO8601ToTime from '~/util/convertISO8601ToTime';
// import Play from '~/static/images/play';
// import youtube from '~/apis/youtube';

// const KEY = 'AIzaSyBz7hBEUeLfjjkbutilOakeLZv5hCDf-GM';

// const VIDEOS_ARCHIVE = gql`
//   query VideosArchive {
//     videos {
//       nodes {
//         excerpt
//         title
//         slug
//         zmVideoACF {
//           videoUrl
//           videoCover {
//             mediaItemUrl
//           }
//         }
//       }
//     }
//     categories {
//       nodes {
//         name
//         videos {
//           nodes {
//             title
//             excerpt
//             date
//             zmVideoACF {
//               videoUrl
//               videoCover {
//                 mediaItemUrl
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

class VideosArchive extends Component {
  // constructor(props) {
  //   super(props);
  //   const { title, zmVideoACF } = this.props.videos[0];
  //   const { videoUrl, videoCover, duration } = zmVideoACF;
  //   this.state = {
  //     selectedVideo: {
  //       url: formatYouTubeUrl(videoUrl),
  //       imageUrl: videoCover.mediaItemUrl,
  //       duration,
  //       title,
  //     },
  //     selectedIndex: 0,
  //     isPlaying: false,
  //   };
  // }

  // onVideoSelect = (url, imageUrl, title, duration, index) => {
  //   this.setState({
  //     selectedVideo: {
  //       url: formatYouTubeUrl(url),
  //       imageUrl,
  //       title,
  //       duration,
  //     },
  //   });
  //   this.setState({
  //     selectedIndex: index,
  //     isPlaying: true,
  //   });
  // };

  // onClick = () => {
  //   this.setState({ isPlaying: !this.state.isPlaying });
  // };

  render() {
    // const { videos, categories } = this.props;
    // const { isPlaying } = this.state;
    // const { url, imageUrl, title, duration } = this.state.selectedVideo;
    return (
      <div className="videos-page">
        <Head>
          {/* TODO: change title */}
          <title>{'Відео'}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="videos-main">Category</main>
      </div>
    );
  }
}

// VideosArchive.getInitialProps = async () => {
//   const { data } = await apolloClient.query({
//     query: VIDEOS_ARCHIVE,
//   });

//   // Create array with unique video ids
//   const videoIds = Array.from(
//     new Set(
//       data.videos.nodes.map((node) => {
//         const { videoUrl } = node.zmVideoACF;
//         const videoId = videoUrl.split('?v=')[1];
//         return videoId;
//       })
//     )
//   );

//   const response = await youtube.get('/videos', {
//     params: {
//       id: videoIds.join(','),
//       part: 'contentDetails',
//       key: KEY,
//     },
//   });

//   // Create object with video durations and id as a key
//   const videoDurations = response.data.items.reduce((acc, item) => {
//     acc[item.id] = convertISO8601ToTime(item.contentDetails.duration);
//     return acc;
//   }, {});

//   // Add duration for videos
//   const videos = data.videos.nodes.map((node) => {
//     const { zmVideoACF } = node;
//     const videoId = zmVideoACF.videoUrl.split('?v=')[1];

//     return {
//       ...node,
//       zmVideoACF: {
//         ...zmVideoACF,
//         duration: videoDurations[videoId],
//       },
//     };
//   });

//   // Add duration for videos
//   const categories = data.categories.nodes.map((node) => {
//     const videoNodes = node.videos.nodes.map((videoNode) => {
//       const { zmVideoACF } = videoNode;
//       const videoId = zmVideoACF.videoUrl.split('?v=')[1];
//       return {
//         ...videoNode,
//         zmVideoACF: {
//           ...zmVideoACF,
//           duration: videoDurations[videoId],
//         },
//       };
//     });
//     return {
//       ...node,
//       videos: {
//         nodes: [...videoNodes],
//       },
//     };
//   });

//   return {
//     videos,
//     categories,
//   };
// };

export default VideosArchive;
