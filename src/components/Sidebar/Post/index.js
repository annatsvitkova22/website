import React from 'react';

import SideBarNews from '~/components/Sidebar/Post/SideBarNews';
import SideBarPopular from '~/components/Sidebar/Post/SideBarPopular';
import SideBarBlogs from '~/components/Sidebar/Post/SideBarBlogs';

const SideBarPost = ({ news, blogs }) => {
  return (
    <section className={'sidebar-latest'}>
      <SideBarNews news={news} />
      <SideBarPopular news={news} />
      <SideBarBlogs news={blogs} />
    </section>
  );
};

export default SideBarPost;
