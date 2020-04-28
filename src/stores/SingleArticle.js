import { createStateLink } from '@hookstate/core';

export const SingleArticleStore = createStateLink({ post: {} });

export const CreateSingleArticleStore = (post, loaded) => {
  if (!loaded) {
    SingleArticleStore.set({ post });
  }
  return SingleArticleStore;
};

export const updateComments = (commentCount, comments) => {
  const singleArticleStore = SingleArticleStore.get();
  singleArticleStore.post.commentCount = commentCount;
  singleArticleStore.post.comments = comments;
  SingleArticleStore.set(singleArticleStore);
}

export const updateLikes = (likes) => {
  const singleArticleStore = SingleArticleStore.get();
  singleArticleStore.post.statisticsACF.likes = likes;
  SingleArticleStore.set(singleArticleStore);
}
