import youtube from '~/apis/youtube';
import convertISO8601ToTime from '~/util/convertISO8601ToTime';

const KEY = 'AIzaSyBz7hBEUeLfjjkbutilOakeLZv5hCDf-GM';

const addVideoDurations = async (videosData = {}) => {
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

  return new Promise((resolve) => {
    resolve(formattedVideos);
  });
};

export default addVideoDurations;
