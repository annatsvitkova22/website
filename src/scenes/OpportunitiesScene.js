import React from 'react';

import Article from '~/components/Article';

const OpportunitiesScene = ({ opportunities }) => (
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

export default OpportunitiesScene;
