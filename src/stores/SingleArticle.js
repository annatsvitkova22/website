import { createStateLink } from '@hookstate/core';

export const SingleArticleStore = createStateLink({ post: {} });

export const CreateSingleArticleStore = (post) => {
  SingleArticleStore.set({ post });
  return SingleArticleStore;
};

export const updateComments = (commentCount, comments) => {
  const singleArticleStore = SingleArticleStore.get();
  singleArticleStore.post.commentCount = commentCount;
  singleArticleStore.post.comments = comments;
  SingleArticleStore.set(singleArticleStore);
}
