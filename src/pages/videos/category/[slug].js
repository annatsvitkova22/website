import React, { useRef, useState, useEffect } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import 'moment/locale/uk';
import Link from 'next/link';
import { Waypoint } from 'react-waypoint';

import PhotoSwipeGallery from '~/components/PhotoSwipeGallery';
import {
  getThumbnailVideo,
  prepareGalleryItems,
  options,
} from '~/components/PhotoSwipeGallery/videoGalleryUtils';
import CatList from '~/components/CatList';
import CatSelect from '~/components/CatSelect';
import apolloClient from '~/lib/ApolloClient';
import addVideoDurations from '~/util/addVideoDurations';
import Times from '~/static/images/times';
import VideoCategoryLoader from '~/components/Loaders/VideoCategoryLoader';
import VideosCategoryPageLoader from '~/components/Loaders/VideosCategoryPageLoader';

const CATEGORY_ID = gql`
  query CategoryId($slug: [String]) {
    categories(where: { slug: $slug }) {
      nodes {
        name
        categoryId
      }
    }
  }
`;

const VIDEOS = gql`
  query Videos($categoryId: Int, $first: Int, $endCursor: String) {
    videos(
      where: { categoryId: $categoryId }
      first: $first
      after: $endCursor
    ) {
      nodes {
        title
        excerpt
        date
        zmVideoACF {
          videoCover {
            mediaItemUrl
          }
          videoUrl
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const CATEGORIES = gql`
  query Categories {
    categories(where: { hideEmpty: true }) {
      nodes {
        name
        slug
        categoryId
        videos {
          nodes {
            videoId
          }
        }
      }
    }
  }
`;

const Category = (props) => {
  const videosRef = useRef();
  const [state, setState] = useState({ ...props, mobile: false });

  useEffect(() => {
    const loadContent = async () => {
      const categoryData = await apolloClient.query({
        query: CATEGORY_ID,
        variables: { slug: props.query.slug },
      });
      const { categoryId, name } = categoryData.data.categories.nodes[0];

      const videosData = await apolloClient.query({
        query: VIDEOS,
        variables: { categoryId, first: 12 },
      });

      const categories = await apolloClient.query({
        query: CATEGORIES,
      });

      setState({
        ...state,
        endCursor: videosData.data.videos.pageInfo.endCursor,
        hasNextPage: videosData.data.videos.pageInfo.hasNextPage,
        categories: categories.data.categories.nodes,
        categoryName: name,
        currCatId: categoryId,
        // TODO: Put bellow function on frontend
        videos: await addVideoDurations(videosData.data.videos.nodes),
      });
    };

    const updateMobile = () => {
      if (window.outerWidth < 768) {
        setState((prevState) =>
          prevState.mobile !== true ? { ...prevState, mobile: true } : prevState
        );
      } else {
        setState((prevState) =>
          prevState.mobile !== false
            ? { ...prevState, mobile: false }
            : prevState
        );
      }
    };

    if (!state.categories) {
      loadContent();
    }

    updateMobile();

    window.addEventListener('resize', updateMobile);

    return () => {
      window.removeEventListener('resize', updateMobile);
    };
  }, [props.query.slug, state]);

  const onLoadMore = async () => {
    const { videos, endCursor, isLoading, hasNextPage } = state;

    // TODO: check why it's calling on the initial load

    if (!isLoading && hasNextPage) {
      setState({
        ...state,
        isLoading: true,
      });

      const videosData = await apolloClient.query({
        query: VIDEOS,
        variables: {
          categoryId: state.currCatId,
          first: 4,
          endCursor,
        },
      });

      const formattedVideos = await addVideoDurations(
        videosData.data.videos.nodes
      );

      setState({
        ...state,
        videos: [...videos, ...formattedVideos],
        endCursor: videosData.data.videos.pageInfo
          ? videosData.data.videos.pageInfo.endCursor
          : false,
        hasNextPage: videosData.data.videos.pageInfo
          ? videosData.data.videos.pageInfo.hasNextPage
          : false,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    const updateCategory = async () => {
      setState({
        ...state,
        isUpdating: true,
      });

      const categoryData = await apolloClient.query({
        query: CATEGORY_ID,
        variables: { slug: props.query.slug },
      });
      const { categoryId, name } = categoryData.data.categories.nodes[0];

      const videosData = await apolloClient.query({
        query: VIDEOS,
        variables: { categoryId, first: 12 },
      });

      setState({
        ...state,
        currCatId: categoryId,
        categoryName: name,
        isUpdating: false,
        endCursor: videosData.data.videos.pageInfo.endCursor,
        hasNextPage: videosData.data.videos.pageInfo.hasNextPage,
        videos: await addVideoDurations(videosData.data.videos.nodes),
      });
    };

    updateCategory();
  }, [props.query.slug]);

  const {
    categoryName,
    currCatId,
    categories,
    mobile,
    isUpdating,
    hasNextPage,
  } = state;

  if (!categories) {
    return (
      <div className="videos-page">
        <main className="videos-main">
          <div className="container">
            <div className="row">
              <VideosCategoryPageLoader />
              <VideoCategoryLoader />
              <VideoCategoryLoader />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="videos-page">
      <Head>
        <title>ЗМІСТ - Відео - {categoryName}</title>
      </Head>

      <main className="videos-cat">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {mobile && (
                <CatSelect categories={categories} currCatId={currCatId} />
              )}
              {!mobile && (
                <h1 className="cat-page__title text-uppercase d-flex heading-huge">
                  <span className="tx-ellipsis">{categoryName}</span>
                  <Link href="/videos">
                    <a className="cat-page__back line-height-1">
                      <Times />
                    </a>
                  </Link>
                </h1>
              )}
            </div>
            <div className="col-12">
              {!mobile && (
                <CatList categories={categories} currCatId={currCatId} />
              )}
            </div>
          </div>
          <div ref={videosRef} className="row">
            {!isUpdating && (
              <PhotoSwipeGallery
                className="col-12 video-cat-gall"
                items={prepareGalleryItems(state.videos)}
                options={options()}
                thumbnailContent={getThumbnailVideo}
              />
            )}
            {isUpdating && (
              <>
                <VideoCategoryLoader />
                <VideoCategoryLoader />
              </>
            )}
            {hasNextPage && <Waypoint onEnter={onLoadMore} />}
          </div>
        </div>
      </main>
    </div>
  );
};

Category.propTypes = {
  categoryName: PropTypes.string,
  currCatId: PropTypes.number,
  videos: PropTypes.array,
  categories: PropTypes.array,
  endCursor: PropTypes.string,
  hasNextPage: PropTypes.bool,
};

Category.getInitialProps = async ({ query }) => {
  if (process.browser) {
    return { query };
  }

  const categoryData = await apolloClient.query({
    query: CATEGORY_ID,
    variables: { slug: query.slug },
  });
  const { categoryId, name } = categoryData.data.categories.nodes[0];

  const videosData = await apolloClient.query({
    query: VIDEOS,
    variables: { categoryId, first: 12 },
  });

  const categories = await apolloClient.query({
    query: CATEGORIES,
  });

  return {
    query,
    endCursor: videosData.data.videos.pageInfo.endCursor,
    hasNextPage: videosData.data.videos.pageInfo.hasNextPage,
    categories: categories.data.categories.nodes,
    categoryName: name,
    currCatId: categoryId,
    // TODO: Put bellow function on frontend
    videos: await addVideoDurations(videosData.data.videos.nodes),
  };
};

export default Category;
