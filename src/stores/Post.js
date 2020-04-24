import { createStateLink, useStateLink } from '@hookstate/core';

export const PostStore = createStateLink({
  visibility: [
    {
      isVisible: false,
    },
  ],
});
