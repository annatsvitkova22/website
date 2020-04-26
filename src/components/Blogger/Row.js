import React from 'react';
import Blogger from '~/components/Blogger/index';
import Article from '~/components/Article';
import * as classnames from 'classnames';

const BloggerRow = ({ loader, inRow = 3, blogs: { nodes }, ...profile }) => {
  return (
    <div className="blogger-row row">
      <Blogger className="col-md-3" {...profile} />
      <div className="col-md-9">
        <div className="row">
          {nodes.map((blog) => (
            <Article
              className={classnames({
                'col-md-4': inRow === 3,
                'col-md-6': inRow === 2,
              })}
              type="blogs"
              post={blog}
              key={blog.id}
            />
          ))}
          {loader && loader}
        </div>
      </div>
    </div>
  );
};

export default BloggerRow;
