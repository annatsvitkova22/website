import React from 'react';
import Link from 'next/link';

const MainPublications = ({ publications: { nodes: publications } }) => (
  <div className="primary-publs">
    {publications.slice(0, 3).map(({ title, slug }) => (
      <div className="primary-publ">
        <h3 className="primary-publ__title">
          <Link href={`/publications/${slug}`}>
            <a>{title}</a>
          </Link>
        </h3>
      </div>
    ))}
  </div>
);

export default MainPublications;
