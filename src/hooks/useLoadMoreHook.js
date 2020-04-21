import { useEffect, useState } from 'react';

import apolloClient from '~/lib/ApolloClient';

const useLoadMoreHook = (query, props, type = '') => {
  const [state, setState] = useState({
    data: props,
    endCursor: props.pageInfo ? props.pageInfo.endCursor : null,
    isLoading: false,
  });

  useEffect(() => {
    async function loadData() {
      const response = await apolloClient.query({
        query,
        variables: {
          cursor: null,
        },
      });
      switch (type) {
        case 'blogs':
          setState({
            data: response.data.blogs,
            endCursor: response.data.blogs.pageInfo.endCursor,
            isLoading: false,
          });
          break;
        case 'publications':
          setState({
            data: response.data.publications,
            endCursor: response.data.publications.pageInfo.endCursor,
            isLoading: false,
          });
          break;
        case 'news':
          setState({
            data: response.data.posts,
            endCursor: response.data.posts.pageInfo.endCursor,
            isLoading: false,
          });
          break;
        case 'others':
          setState({
            data: response.data.others,
            endCursor: response.data.posts.pageInfo.endCursor,
            isLoading: false,
          });
          break;
      }
    }

    if (!state.data.nodes) {
      loadData();
      if (!state.isLoading) {
        setState({
          ...state,
          isLoading: true,
        });
      }
    }
  }, []);

  const fetchingContent = async () => {
    setState({
      ...state,
      isLoading: true,
    });

    const responseData = await apolloClient.query({
      query,
      variables: {
        cursor: state.endCursor,
      },
    });
    switch (type) {
      case 'blogs':
        setState({
          data: {
            ...state.data,
            nodes: [...state.data.nodes, ...responseData.data.blogs.nodes],
          },
          endCursor: responseData.data.blogs.pageInfo
            ? responseData.data.blogs.pageInfo.endCursor
            : false,
          isLoading: false,
        });
        break;
      case 'publications':
        setState({
          data: {
            ...state.data,
            nodes: [
              ...state.data.nodes,
              ...responseData.data.publications.nodes,
            ],
          },
          endCursor: responseData.data.publications.pageInfo
            ? responseData.data.publications.pageInfo.endCursor
            : false,
          isLoading: false,
        });
        break;
      case 'news':
        setState({
          data: {
            ...state.data,
            nodes: [...state.data.nodes, ...responseData.data.posts.nodes],
          },
          endCursor: responseData.data.posts.pageInfo
            ? responseData.data.posts.pageInfo.endCursor
            : false,
          isLoading: false,
        });
        break;
      case 'others':
        setState({
          isLoading: false,
          data: {
            ...state.data,
            nodes: [...state.data.nodes, ...responseData.data.others.nodes],
          },
          endCursor: responseData.data.others.pageInfo
            ? responseData.data.others.pageInfo.endCursor
            : false,
        });
        break;
    }
  };
  return {
    state,
    fetchingContent,
  };
};

export default useLoadMoreHook;
