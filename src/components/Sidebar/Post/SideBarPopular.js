import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import SidebarLoader from '~/components/Loaders/SidebarLoader';

const SideBarPopular = ({ publications }) => {
  if (!publications) return <SidebarLoader />;

  return (
    <ul className={'sidebar-popular'}>
      <li className={'sidebar-popular__title'}>популярне</li>
      {publications.nodes.map((item, i) => {
        return (
          <li key={i} className={'sidebar-popular__item'}>
            <Link
              href={`/publications/[slug]`}
              as={`/publications/${item.slug}`}
            >
              <a href={`/publications/${item.slug}`}>
                <div className={'sidebar-popular__wrapper'}>
                  <span className={'sidebar-popular__text'}>
                    {item.title.toLowerCase()}
                  </span>
                  <img
                    src={item.featuredImage.mediaItemUrl}
                    className={'sidebar-popular__image'}
                    alt={item.featuredImage.title}
                  />
                </div>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

SideBarPopular.propTypes = {
  news: PropTypes.array,
  fetchingContent: PropTypes.any,
  isLoading: PropTypes.bool,
};

export default SideBarPopular;
