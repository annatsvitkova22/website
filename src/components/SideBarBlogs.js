import React from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import SidebarLoader from '~/components/Loaders/SidebarLoader';

const SideBarBlogs = ({ news, fetchingContent, isLoading }) => {
  if (!news) return <SidebarLoader />;
  return (
    <ul className={'sidebar-blogs'}>
      <li className={'sidebar-blogs__title'}>блоги</li>
      {news.nodes.map((item, i) => {
        return (
          <li key={i} className={'sidebar-blogs__item'}>
            <a href={item.link}>
              <div className={'sidebar-blogs__wrapper'}>
                <span className={'sidebar-blogs__text'}>{item.title}</span>
                <span className={'sidebar-blogs__author'}>
                  Вікторія Іванченко
                </span>
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

SideBarBlogs.propTypes = {
  news: PropTypes.array,
};

export default SideBarBlogs;
