import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import _ from 'lodash';
import * as classnames from 'classnames';

import ArticleContext from '~/components/Article/Context';

const ArticleTitle = ({ post, className }) => {
  const [width, setWidth] = useState();
  const breakpoint = 768;
  const postType = useContext(ArticleContext);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };
    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <h2 className={classnames('article-title', className)}>
      <Link href={`/${postType}/[slug]`} as={`/${postType}/${post.slug}`}>
        <a className="article-title__link" href={`/${postType}/${post.slug}`}>
          {width < breakpoint
            ? _.truncate(post.title, {
                length: 50,
                separator: '...',
              })
            : post.title}
        </a>
      </Link>
    </h2>
  );
};

export default ArticleTitle;
