import React, { useState } from 'react';
import { truncate } from 'lodash';
import * as classnames from 'classnames';

const BloggerBio = ({ bio, className }) => {
  const [expanded, setExpanded] = useState(false);
  let text = bio;
  // TODO: change count if ot required by styling to be pixel perfect
  const length = 100;
  const shouldTrancate = bio.length > length;
  if (shouldTrancate && !expanded) {
    text = truncate(bio, {
      length: length,
      separator: '...',
    });
  }
  return (
    <div className={classnames('blogger-bio', className)}>
      <div className="blogger-bio__text">{text}</div>
      {shouldTrancate && (
        <button
          className="blogger-bio__button"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '...Менше' : 'Більше...'}
        </button>
      )}
    </div>
  );
};

export default BloggerBio;
