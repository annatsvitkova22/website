import axios from 'axios';

export default axios.create({
  // TODO: move URL to configs
  baseURL: 'https://www.googleapis.com/youtube/v3',
});
