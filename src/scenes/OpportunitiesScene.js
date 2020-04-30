import React from 'react';

import Article from '~/components/Article';

const OpportunitiesScene = ({ opportunities }) => (
  <div className="container articles-container opp-section">
    <div className="row">
      <div className="col-12">
        <h6 className="text-uppercase tx-family-alt">можливості</h6>
      </div>
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

export default OpportunitiesScene;
