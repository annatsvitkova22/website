import React from 'react';
import Link from 'next/link';
import * as classnames from 'classnames';

const ArticleAuthor = ({ author, className }) => {
  // TODO: nicename is required it not available in poblic query
  // how can we fix it?
  return (
    <Link href="/search" as={`/search`}>
      <a
        className={classnames('meta-author', className)}
        rel="author"
        href={`/search`}
      >
        {author.name}
      </a>
    </Link>
  );
};

export default ArticleAuthor;
