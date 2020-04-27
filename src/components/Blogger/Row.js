import React from 'react';
import Blogger from '~/components/Blogger/index';
import Article from '~/components/Article';
import * as classnames from 'classnames';
import { times } from 'lodash';

const BloggerRow = ({
  waypoint,
  loader,
  isLoading = false,
  inRow = 3,
  blogs: { nodes, pageInfo },
  ...profile
}) => {
  // console.log({ nodes, pageInfo });
  const hasLoadMore = pageInfo && waypoint;

  return (
    <div className="blogger-row row">
      <Blogger className="col-md-3" {...profile} />
      <div className="col-md-9">
        <div className="row">
          {nodes.map((blog, i) => (
            <React.Fragment key={blog.id}>
              <Article
                className={classnames({
                  'col-md-4': inRow === 3,
                  'col-md-6': inRow === 2,
                })}
                type="blogs"
                post={blog}
              />
              {hasLoadMore &&
                i === nodes.length - 1 &&
                i < pageInfo.total - 1 &&
                waypoint}
            </React.Fragment>
          ))}
          {loader &&
            isLoading &&
            times(inRow, (i) => (
              <div
                key={i}
                className={classnames({
                  'col-md-4': inRow === 3,
                  'col-md-6': inRow === 2,
                })}
              >
                {loader}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BloggerRow;
