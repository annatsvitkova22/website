import React from 'react';
import * as classnames from 'classnames';

import NavLink from '~/components/SiteLink';

const ArticleTaxonomies = ({
  categories = { nodes: [] },
  tags = { nodes: [] },
  className,
}) => {
  const taxonomies =
    categories.nodes.length > tags.nodes.length ? categories.nodes : tags.nodes;
  if (!taxonomies.length) return null;
  return (
    <ul
      className={classnames('meta-taxonomy', {
        'meta-taxonomy--categories': categories.length !== 0,
        'meta-taxonomy--tags': tags.length !== 0,
      })}
    >
      {taxonomies.map((taxonomy) => {
        const type = taxonomy.__typename.toLowerCase();
        return (
          <li className="meta-taxonomy__item" key={taxonomy.slug}>
            <NavLink
              className={classnames('meta-taxonomy__link', className)}
              href={`/${type}/${taxonomy.slug.toLowerCase()}`}
            >
              {taxonomy.name}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default ArticleTaxonomies;
