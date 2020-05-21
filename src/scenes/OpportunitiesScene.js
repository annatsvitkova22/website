import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import Article from '~/components/Article';
import OpportunitiesLoader from '~/components/Loaders/OpportunitiesLoader';

const OpportunitiesScene = ({ opportunities, children, isLoading }) => {
  if (typeof children === 'object' && !isLoading) {
    return children;
  }

  if (isEmpty(opportunities) && isLoading) {
    return (
      <div className="opportunities-page">
        <div className="container">
          <div className="row">
            <div className="article col-lg-6">
              <OpportunitiesLoader />
            </div>
            <div className="article col-lg-6">
              <OpportunitiesLoader />
            </div>
            <div className="article col-lg-6">
              <OpportunitiesLoader />
            </div>
            <div className="article col-lg-6">
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
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

OpportunitiesScene.propTypes = {
  opportunities: PropTypes.object,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

export default OpportunitiesScene;
