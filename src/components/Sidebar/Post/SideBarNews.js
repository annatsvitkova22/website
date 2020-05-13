import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import SidebarLoader from '~/components/Loaders/SidebarLoader';

const SideBarNews = ({ news }) => {
  if (!news) return <SidebarLoader />;
  return (
    <ul className={'sidebar-news'}>
      <li className={'sidebar-news__title'}>останні новини</li>
      {news.nodes.map((item, i) => {
        return (
          <li key={i} className={'sidebar-news__item'}>
            <Link href={`/news/[slug]`} as={`/news/${item.slug}`}>
              <a href={`/news/${item.slug}`} className={'sidebar-news__link'}>
                {item.title.toLowerCase()}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

SideBarNews.propTypes = {
  news: PropTypes.array,
};

export default SideBarNews;
