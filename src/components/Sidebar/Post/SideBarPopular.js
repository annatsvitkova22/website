import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import SidebarLoader from '~/components/Loaders/SidebarLoader';

const SideBarPopular = ({ news }) => {
  if (!news) return <SidebarLoader />;

  return (
    <ul className={'sidebar-popular'}>
      <li className={'sidebar-popular__title'}>популярне</li>
      {news.nodes.slice(5).map((item, i) => {
        return (
          <li key={i} className={'sidebar-popular__item'}>
            <Link href={`/news/[slug]`} as={`/news/${item.slug}`}>
              <a href={`/news/${item.slug}`}>
                <div className={'sidebar-popular__wrapper'}>
                  <span className={'sidebar-popular__text'}>{item.title}</span>
                  <span className="sidebar-popular__image" />
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
