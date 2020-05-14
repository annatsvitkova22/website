import React from 'react';
import PropTypes from 'prop-types';

import Article from '~/components/Article';

const PublicationsScene = ({ publications }) => (
  <div className="container">
    <div className="last-publs">
      <div className="row">
        {publications.nodes.slice(0, 6).map((post, i) => (
          <Article type="publications" post={post} key={i} />
        ))}
      </div>
    </div>
  </div>
);

PublicationsScene.propTypes = {
  publications: PropTypes.object,
};

export default PublicationsScene;
