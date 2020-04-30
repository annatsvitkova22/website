import React, { Component } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import 'moment/locale/uk';
import Link from 'next/link';

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

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: this.props.videos,
      isLoading: false,
      endCursor: this.props.endCursor,
      hasNextPage: this.props.hasNextPage,
      mobile: false,
    };
    this.videosRef = React.createRef();
  }

  updateMobile = () => {
    window.outerWidth < 768
      ? this.setState({ mobile: true })
      : this.setState({ mobile: false });
  };

  componentDidMount() {
    this.updateMobile();
    window.addEventListener('resize', this.updateMobile);

    if (this.state.hasNextPage) {
      window.addEventListener('scroll', this.onScroll);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currCatId !== this.props.currCatId) {
      this.setState({
        videos: this.props.videos,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMobile);
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const { offsetTop, offsetHeight } = this.videosRef.current;
    if (offsetTop + offsetHeight >= window.scrollY) {
      this.onLoadMore();
    }
  };

  onLoadMore = async () => {
    const { isLoading, videos, endCursor, hasNextPage } = this.state;
    if (!isLoading && hasNextPage) {
      this.setState({
        isLoading: true,
      });
      const videosData = await apolloClient.query({
        query: VIDEOS,
        variables: {
          categoryId: this.props.currCatId,
          first: 4,
          endCursor,
        },
      });

      const formattedVideos = await addVideoDurations(
        videosData.data.videos.nodes
      );

      this.setState({
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

  render() {
    const { categoryName, currCatId, categories } = this.props;
    const { isLoading, mobile } = this.state;

    return (
      <div className="videos-page">
        <Head>
          {/* TODO: change title */}
          <title>{'Відео'}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="videos-main">
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
            <div ref={this.videosRef} className="row">
              <PhotoSwipeGallery
                className="col-12 video-cat-gall"
                items={prepareGalleryItems(this.state.videos)}
                options={options()}
                thumbnailContent={getThumbnailVideo}
              />
              {isLoading && <VideoCategoryLoader />}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

Category.propTypes = {
  categoryName: PropTypes.string,
  currCatId: PropTypes.number,
  videos: PropTypes.array,
  categories: PropTypes.array,
  endCursor: PropTypes.string,
  hasNextPage: PropTypes.bool,
};

Category.getInitialProps = async ({ query: { slug } }) => {
  const categoryData = await apolloClient.query({
    query: CATEGORY_ID,
    variables: { slug },
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
