import React from 'react';

import Article from '~/components/Article';

const PublicationsScene = ({ publications }) => (
  <div className="container">
    <div className="last-publs">
      <div className="row">
        {publications.nodes.map((post, i) => (
          <Article type="publications" post={post} key={post.id} />
        ))}
      </div>
    </div>
  </div>
);

export default PublicationsScene;
