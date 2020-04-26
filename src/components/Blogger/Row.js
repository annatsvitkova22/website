import React from 'react';
import Blogger from '~/components/Blogger/index';
import Article from '~/components/Article';

const BloggerRow = ({ blogs: { nodes }, ...profile }) => {
  return (
    <div className="blogger-row row">
      <Blogger className="col-md-3" {...profile} />
      {nodes.map((blog) => (
        <Article className="col-md-3" type="blogs" post={blog} key={blog.id} />
      ))}
    </div>
  );
};

export default BloggerRow;
