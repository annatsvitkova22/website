import React from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import SidebarLoader from '~/components/Loaders/SidebarLoader';

const SideBarNews = ({ news, isLoading }) => {
  if (!news) return <SidebarLoader />;
  return (
    <ul className={'sidebar-news'}>
      {news.nodes.map((item, i) => {
        return (
          <li key={i} className={'sidebar-news__item'}>
            <a href={item.link} className={'sidebar-news__link'}>
              {item.title}
            </a>
            {i === news.nodes.length - 5 && i < news.pageInfo.total && (
              <Waypoint />
            )}
          </li>
        );
      })}
      {isLoading && <SidebarLoader />}
    </ul>
  );
};

SideBarNews.propTypes = {
  news: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default SideBarNews;
