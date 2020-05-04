import React, { useContext } from 'react';
import Link from 'next/link';
import * as classnames from 'classnames';

import ArticleContext from '~/components/Article/Context';

const ArticleAuthor = ({ author: { slug, name }, className }) => {
  const postType = useContext(ArticleContext);

  let href = `/search?by=author&q=${name}`;
  let as = `/search?by=author&q=${name}`;

  if (postType === 'blogs') {
    href = `/blogs/author/${slug}`;
    as = '/blogs/author/[slug]';
  }

  return (
    <Link href={as} as={href}>
      <a
        className={classnames('meta-author', className)}
        rel="author"
        href={href}
      >
        {name}
      </a>
    </Link>
  );
};

export default ArticleAuthor;
