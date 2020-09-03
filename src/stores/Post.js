import { createStateLink } from '@hookstate/core';

const PostStore = createStateLink({
  visibility: [
    {
      isVisible: false,
    },
  ],
});

export default PostStore;
