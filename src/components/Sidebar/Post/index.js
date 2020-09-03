import React from 'react';
import PropTypes from 'prop-types';

import SideBarNews from '~/components/Sidebar/Post/SideBarNews';
import SideBarPopular from '~/components/Sidebar/Post/SideBarPopular';
import SideBarBlogs from '~/components/Sidebar/Post/SideBarBlogs';

const SideBarPost = ({ news, blogs, publications }) => {
  return (
    <aside className={'sidebar-latest'}>
      <SideBarNews news={news} />
      <SideBarPopular publications={publications} />
      <SideBarBlogs news={blogs} />
    </aside>
  );
};

SideBarPost.propTypes = {
  news: PropTypes.any,
  blogs: PropTypes.any,
  publications: PropTypes.any,
};

export default SideBarPost;
