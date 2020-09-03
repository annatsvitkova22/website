import KEY from './youTubeApiKey';
import convertISO8601ToTime from './convertISO8601ToTime';

import youtube from '~/apis/youtube';

const getDurations = async (nodes = []) => {
  // Create array with unique video ids
  const videoIds = Array.from(
    new Set(
      nodes.map((node) => {
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
  const durations = response.data.items.reduce((acc, item) => {
    acc[item.id] = convertISO8601ToTime(item.contentDetails.duration);
    return acc;
  }, {});

  return new Promise((resolve) => {
    resolve(durations);
  });
};

export default getDurations;
