import React from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import SidebarLoader from '~/components/Loaders/SidebarLoader';

const SideBarPopular = ({ news, fetchingContent, isLoading }) => {
  if (!news) return <SidebarLoader />;
  return (
    <ul className={'sidebar-popular'}>
      <li className={'sidebar-popular__title'}>популярне</li>
      {news.nodes.map((item, i) => {
        return (
          <li key={i} className={'sidebar-popular__item'}>
            <a href={item.link}>
              <div className={'sidebar-popular__wrapper'}>
                <span className={'sidebar-popular__text'}>{item.title}</span>
                <span className="sidebar-popular__image" />
              </div>
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

SideBarPopular.propTypes = {
  news: PropTypes.array,
  fetchingContent: PropTypes.any,
  isLoading: PropTypes.bool,
};

export default SideBarPopular;
