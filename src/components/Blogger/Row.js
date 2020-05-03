import React from 'react';
import * as classnames from 'classnames';
import { times } from 'lodash';

import Blogger from '~/components/Blogger/index';
import Article from '~/components/Article';

const BloggerRow = ({
  showBio,
  withLinks,
  waypoint,
  loader,
  isLoading = false,
  inRow = 3,
  blogs: { nodes, pageInfo },
  ...profile
}) => {
  const hasLoadMore = pageInfo && waypoint;

  return (
    <div className="blogger-row row">
      {/* TODO: should we make it sticky on single blogger page? */}
      <Blogger withLinks={withLinks} showBio={showBio} className="col-md-3" {...profile} />
      <div className="col-md-12 col-lg-9 col-xl-9">
        <div className="blogger-row__wrapper row">
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
