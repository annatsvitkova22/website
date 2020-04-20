import getDurations from './getDurations';

const addVideoDurations = async (nodes = []) => {
  // // Create object with video durations and id as a key
  const videoDurations = await getDurations(nodes);

  // Add duration for videos
  const formattedVideos = nodes.map((node) => {
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
