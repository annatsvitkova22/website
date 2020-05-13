import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import SidebarLoader from '~/components/Loaders/SidebarLoader';

const SideBarBlogs = ({ news }) => {
  if (!news) return <SidebarLoader />;
  return (
    <ul className={'sidebar-blogs'}>
      <li className={'sidebar-blogs__title'}>блоги</li>
      {news.nodes.map((item, i) => {
        return (
          <li key={i} className={'sidebar-blogs__item'}>
            <Link href={`/blogs/[slug]`} as={`/blogs/${item.slug}`}>
              <a href={`/blogs/${item.slug}`}>
                <div className={'sidebar-blogs__wrapper'}>
                  <span className={'sidebar-blogs__text'}>
                    {item.title.toLowerCase()}
                  </span>
                  <span className={'sidebar-blogs__author'}>
                    {item.author.name}
                  </span>
                </div>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

SideBarBlogs.propTypes = {
  news: PropTypes.array,
};

export default SideBarBlogs;
