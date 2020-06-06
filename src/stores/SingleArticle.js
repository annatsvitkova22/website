import { createStateLink } from '@hookstate/core';

import apolloClient from '~/lib/ApolloClient';

export const SingleArticleStore = createStateLink({ id: {} });

export const CreateSingleArticleStore = (post, loaded, id) => {
  const singleArticleStore = SingleArticleStore.get();
  if (!loaded) {
    singleArticleStore[id] = post;
    SingleArticleStore.set(singleArticleStore);
  }
  return SingleArticleStore;
}; // Done

export const updateComments = (commentCount, comments, id) => {
  const singleArticleStore = SingleArticleStore.get();
  console.log(singleArticleStore);
  singleArticleStore[id].commentCount = commentCount;
  singleArticleStore[id].comments = comments;
  SingleArticleStore.set(singleArticleStore);
}; // Done

export const updateLikes = (likes, id) => {
  const singleArticleStore = SingleArticleStore.get();
  singleArticleStore[id].statisticsACF.likes = likes;
  SingleArticleStore.set(singleArticleStore);
}; // Done

export const updateShares = (shares, id) => {
  const singleArticleStore = SingleArticleStore.get();
  singleArticleStore[id].cfACF.shared = shares;
  SingleArticleStore.set(singleArticleStore);
};
// Update this query ????
export const updatePost = async (query, slug, postId) => {
  const singleArticleStore = SingleArticleStore.get();
  const { data } = await apolloClient.query({
    query,
    variables: { slug },
  });
  singleArticleStore[postId] = data.crowdfundingBy;
  SingleArticleStore.set(singleArticleStore);
};
