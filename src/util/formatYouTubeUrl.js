const formatYouTubeUrl = (youTubeUrl) => {
  const formattedYouTubeUrl = `https://www.youtube.com/embed/${
    youTubeUrl.split('?v=')[1]
  }`;
  return formattedYouTubeUrl;
};

export default formatYouTubeUrl;
