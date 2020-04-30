import React from 'react';

import Article from '~/components/Article';

const PublicationsScene = ({ publications }) => (
  <div className="container">
    <div className="row">
      <div className="col-12">
        <h6 className="publ-page__title text-uppercase">публікації</h6>
      </div>
    </div>
    <div className="last-publs">
      <div className="row">
        {publications.nodes.map((post) => (
          <Article type="publications" post={post} key={post.id} />
        ))}
      </div>
    </div>
  </div>
);

export default PublicationsScene;
