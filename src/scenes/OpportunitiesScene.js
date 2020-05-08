import React from 'react';

import Article from '~/components/Article';
import OpportunitiesLoader from '~/components/Loaders/OpportunitiesLoader';

const OpportunitiesScene = ({ opportunities, children, loading }) => {
  if (typeof children === 'object' && !loading) {
    return children;
  }

  if (loading) {
    return (
      <div className="opportunities-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <OpportunitiesLoader />
            </div>
            <div className="col-lg-6">
              <OpportunitiesLoader />
            </div>
            <div className="col-lg-6">
              <OpportunitiesLoader />
            </div>
            <div className="col-lg-6">
              <OpportunitiesLoader />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container opp-section">
      <div className="row">
        {opportunities.nodes.map((post, i) => (
          <Article
            className="col-lg-6"
            type="opportunities"
            post={post}
            key={post.id}
          />
        ))}
      </div>
    </div>
  );
};

export default OpportunitiesScene;
