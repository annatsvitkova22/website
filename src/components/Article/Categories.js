import React from 'react';
import Link from 'next/link';
import * as classnames from 'classnames';

const ArticleTaxonomies = ({
  categories = { nodes: [] },
  tags = { nodes: [] },
  className,
}) => {
  const taxonomies =
    categories.nodes.length > categories.nodes.length
      ? categories.nodes
      : tags.nodes;
  if (!taxonomies.length) return null;
  return (
    <ul
      className={classnames('meta-taxonomy', {
        'meta-taxonomy--categories': categories.length !== 0,
        'meta-taxonomy--tags': tags.length !== 0,
      })}
    >
      {taxonomies.map((taxonomy) => (
        <li className="meta-taxonomy__item">
          <Link href="/search" as={`/search`}>
            <a
              className={classnames('meta-taxonomy__link', className)}
              href={`/search`}
            >
              {taxonomy.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ArticleTaxonomies;
