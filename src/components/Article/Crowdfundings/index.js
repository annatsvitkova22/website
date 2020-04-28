import React from 'react';
import * as classnames from 'classnames';
import ArticleTitle from '~/components/Article/Title';
import ArticleFeatured from '~/components/Article/Featured';
import ArticleStatus from '~/components/Article/Status';
import ArticleExcerpt from '~/components/Article/Excerpt';
import ArticleAuthor from '~/components/Article/Author';
import ArticleDate from '~/components/Article/Date';
import getCFStatus from '~/lib/getCFStatus';
import CrowdfundingProgress from '~/components/CrowdfundingProgress';

const ArticleCrowdfundings = ({ post, children, className }) => {
  const { featuredImage, title, slug, excerpt, author, date } = post;
  const status = getCFStatus(post);
  return (
    <article className={classnames('article--crowdfunding', className)}>
      {status && <ArticleStatus {...status} />}
      <ArticleFeatured
        className="article__image"
        image={featuredImage}
        alt={title}
        slug={slug}
      />
      <div className="article__main">
        <ArticleTitle post={post} className="article__title" />
        <ArticleExcerpt dangerouslySetInnerHTML={{ __html: excerpt }} />
      </div>
      <CrowdfundingProgress post={post} />
      <div className="article__meta">
        <ArticleAuthor className="article__author" author={author} /> -{' '}
        <ArticleDate
          className="article__time"
          date={date}
          format={'DD MMMM YYYY'}
        />
      </div>
      {children}
    </article>
  );
};

export default ArticleCrowdfundings;
