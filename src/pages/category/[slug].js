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
import apolloClient from '~/lib/ApolloClient';
import addVideoDurations from '~/util/addVideoDurations';

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
  query Videos($categoryId: Int, $endCursor: String) {
    videos(where: { categoryId: $categoryId }, first: 20, after: $endCursor) {
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
      isAllVideos: false,
      endCursor: this.props.endCursor,
    };
    this.videosRef = React.createRef();
  }

  componentDidMount() {
    if (!this.state.isAllVideos) {
      window.addEventListener('scroll', this.onScroll(this.onLoadMore), false);
    }
  }

  onScroll = (onLoadMore) => () => {
    const { offsetTop, offsetHeight } = this.videosRef.current;
    if (offsetTop + offsetHeight >= window.scrollY) {
      onLoadMore();
    }
  };

  onLoadMore = async () => {
    const { isAllVideos, isLoading, videos, endCursor } = this.state;
    if (!isLoading && !isAllVideos) {
      this.setState({
        isLoading: true,
      });
      const videosData = await apolloClient.query({
        query: VIDEOS,
        variables: {
          categoryId: this.props.currCatId,
          endCursor,
        },
      });

      const formattedVideos = await addVideoDurations(videosData);

      this.setState({
        videos: [...videos, ...formattedVideos],
        endCursor: videosData.data.videos.pageInfo
          ? videosData.data.videos.pageInfo.endCursor
          : false,
        isLoading: false,
      });

      if (formattedVideos.length !== 4) {
        this.setState({
          isAllVideos: true,
        });
      }
    }
  };

  render() {
    const { categoryName, currCatId, categories } = this.props;
    // console.log(this.state.videos);

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
                <h1 className="text-uppercase">{categoryName}</h1>
              </div>
              <div className="col-12">
                <ul className="list-unstyled cat-list">
                  {categories.map((category) => {
                    const { categoryId, slug, name } = category;
                    return (
                      <li
                        className="cat-list__item d-inline-block"
                        key={categoryId}
                      >
                        <Link href={slug}>
                          <a
                            className={`cat-list__button d-inline-block ${
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
                  })}
                </ul>
              </div>
            </div>
            <div ref={this.videosRef} className="row">
              <PhotoSwipeGallery
                className="col-12 video-cat-gall"
                items={prepareGalleryItems(this.state.videos, 10)}
                options={options()}
                thumbnailContent={getThumbnailVideo}
              />
            </div>
            {/* <button onClick={this.onClick}>Load More</button> */}
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
};

Category.getInitialProps = async ({ query: { slug } }) => {
  const categoryData = await apolloClient.query({
    query: CATEGORY_ID,
    variables: { slug },
  });
  const { categoryId, name } = categoryData.data.categories.nodes[0];

  const videosData = await apolloClient.query({
    query: VIDEOS,
    variables: { categoryId },
  });

  const categories = await apolloClient.query({
    query: CATEGORIES,
  });

  return {
    endCursor: videosData.data.videos.pageInfo.endCursor,
    categories: categories.data.categories.nodes,
    categoryName: name,
    currCatId: categoryId,
    videos: await addVideoDurations(videosData),
  };
};

export default Category;
