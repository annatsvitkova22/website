import React from 'react';

import Article from '~/components/Article';

const CrowdfundingsScene = ({ crowdfundings }) => (
  <div className="container crowdfundings-page">
    <div className="crowdfundings-archive">
      <div className="row">
        <div className="col-12">
          <h6 className="text-uppercase tx-family-alt">Збір коштів</h6>
        </div>
      </div>
      <main className="row crowdfundings-archive__articles">
        {crowdfundings.nodes.map((crowdfunding, i) => {
          return (
            <div className="col-md-4" key={crowdfunding.id}>
              <Article type={'crowdfundings'} post={crowdfunding} />
            </div>
          );
        })}
      </main>
    </div>
  </div>
);

export default CrowdfundingsScene;
