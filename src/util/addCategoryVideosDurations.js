const addCategoryVideosDurations = (nodes = [], videoDurations = {}) => {
  const formattedCategories = nodes.map((node) => {
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

  return formattedCategories;
};

export default addCategoryVideosDurations;
