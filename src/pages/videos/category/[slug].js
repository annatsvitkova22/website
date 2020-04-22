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
import SiteLink from '~/components/SiteLink';
import apolloClient from '~/lib/ApolloClient';
import addVideoDurations from '~/util/addVideoDurations';
import Times from '~/static/images/times';
import VideoCategoryLoader from '~/components/Loaders/VideoCategoryLoader';
import NavLink from '~/components/SiteLink';

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
    };
    this.videosRef = React.createRef();
  }

  componentDidMount() {
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
    const { isLoading } = this.state;

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
                <h1 className="cat-page__title text-uppercase d-flex heading-huge">
                  <span className="tx-ellipsis">{categoryName}</span>
                  <Link href="/videos/">
                    <a href="/videos/" className="cat-page__back line-height-1">
                      <Times />
                    </a>
                  </Link>
                </h1>
              </div>
              <div className="col-12">
                <ul className="list-unstyled cat-list">
                  {categories.map((category) => {
                    const { categoryId, slug, name, videos } = category;
                    if (videos.nodes.length !== 0) {
                      return (
                        <li
                          className="cat-list__item d-inline-block"
                          key={categoryId}
                        >
                          <Link
                            href={`/videos/category/[slug]`}
                            as={`/videos/category/${slug}`}
                          >
                            <a
                              href={`video/category/${slug}`}
                              className={`cat-list__button d-inline-block font-weight-bold tx-family-alt ${
                                currCatId === categoryId
                                  ? 'cat-list__button--active'
                                  : ''
                              }`}
                            >
                              {name}
                            </a>
                          </Link>
                        </li>
                      );
                    }
                    return '';
                  })}
                </ul>
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
    videos: await addVideoDurations(videosData.data.videos.nodes),
  };
};

export default Category;
