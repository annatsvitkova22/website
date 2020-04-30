import React from 'react';

import Article from '~/components/Article';

const CrowdfundingsScene = ({ crowdfundings }) => (
  <div className="container crowdfundings-page">
    <main className="row crowdfundings-archive__articles">
      {crowdfundings.nodes.map((crowdfunding) => {
        return (
          <div className="col-md-4" key={crowdfunding.id}>
            <Article type={'crowdfundings'} post={crowdfunding} />
          </div>
        );
      })}
    </main>
  </div>
);

export default CrowdfundingsScene;
