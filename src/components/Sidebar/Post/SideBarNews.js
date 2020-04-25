import React from 'react';
import PropTypes from 'prop-types';

import SidebarLoader from '~/components/Loaders/SidebarLoader';

const SideBarNews = ({ news }) => {
  if (!news) return <SidebarLoader />;
  return (
    <ul className={'sidebar-news'}>
      {news.nodes.map((item, i) => {
        return (
          <li key={i} className={'sidebar-news__item'}>
            <a href={item.link} className={'sidebar-news__link'}>
              {item.title}
            </a>
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