import { createStateLink } from '@hookstate/core';

export const PostStore = createStateLink({
  visibility: [
    {
      isVisible: false,
    },
  ],
});
